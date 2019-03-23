import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

import { NGO } from '../models/ngo.model';
import { Volunteer } from '../models/volunteer.model';
import { Opportunity } from '../models/opportunity.model';
import { Application } from '../models/application.model';
import {map, first } from 'rxjs/operators'
import {Observable} from 'rxjs';
import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {
  constructor(public db: AngularFirestore) {}

  /* Getters */
  getAllOpportunitiesOfNGO(id: string) {
    return this.db.collection('opportunities', ref => ref.where('ngo.id', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data()
        const id = action.payload.doc.id;
        return {id, ...data};
      })),
    );
  }

  getAllApplicationsOfOpportunity(id: string) {
    return this.db.collection('applications', ref => ref.where('opportunityId', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data()
        const id = action.payload.doc.id;
        return {id, ...data};
      })),
    );
  }

  getAllApplicationsOfVolunteer(id: string) {
    return this.db.collection('applications', ref => ref.where('volunteerId', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data()
        const id = action.payload.doc.id;
        return {id, ...data};
      })),
    );
  }

  /* generic getters */
  getOne(collection: string, id: string) {
    return this.db.collection(collection).doc(id).valueChanges();
    /* NOTE: getOne returns undefined if document isn't found */
  }
  getOneNGO(id: string) {
    return this.db.collection('ngos').doc(id).valueChanges();
    /* NOTE: getOne returns undefined if document isn't found */
  }

  /* getMany uses optional QueryFn type for querying DB: */
  /* QueryFn: (ref) => ref.where('fieldName', 'operator', 'fieldValue') */
  getMany<T>(collection: string, queryFn?: QueryFn) {
    return this.db.collection<T>(collection, queryFn).snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data()
        const id = action.payload.doc.id;

        return {id, ...data};
      })),
    );
  }

  /* Please note: create functions use type constructor in order */
  /* to enforce fixed document structure in the DB */
  createVolunteer = (volunteer: Volunteer) => this.db.collection('volunteers').add({ ...new Volunteer(), ...volunteer })
  createNGO = (ngo: NGO) => this.db.collection('ngos').add({ ...new NGO(), ...ngo })
  createOpportunity = (opportunity: Opportunity) => {
    this.getOneNGO(opportunity.ngo.id).pipe(first()).subscribe(
      async (fullNgoData: NGO) => {
        const opportunitiesCountNgo = fullNgoData.opportunitiesCount || 0;
        await this.updateNGO(opportunity.ngo.id, {applicationsCount: opportunitiesCountNgo+1});
        return this.db.collection('opportunities').add({ ...new Opportunity(), ...opportunity });
      }
    )
  }
  
  createApplication = (application: Application) => {
    const { volunteerId, opportunityId } = application;
    this.getOne('volunteers', volunteerId).pipe(first()).subscribe(
      (fullVolunteerData: Volunteer) => {
        this.getOne('opportunities', opportunityId).pipe(first()).subscribe(
          async (fullOpportunityData: Opportunity) => {
            const addedData = {
              volunteerData: {
                name: fullVolunteerData.name,
                image: fullVolunteerData.image
              },
              opportunityData: {
                ngoName: fullOpportunityData.ngo.name,
                name: fullOpportunityData.name,
                about: fullOpportunityData.about,
                location: fullOpportunityData.location,
                prerequisites: fullOpportunityData.prerequisites,
                active: fullOpportunityData.active,
              }
            };
            const applicationsCountVol = fullVolunteerData.applicationsCount || 0;
            const applicationsCountOpp = fullOpportunityData.applicationsCount || 0;
            await this.updateVolunteer(volunteerId, {applicationsCount: applicationsCountVol+1});
            await this.updateOpportunity(opportunityId, {applicationsCount: applicationsCountOpp+1});
            return this.db.collection('applications').add({ ...new Application(), ...application, ...addedData });
          }
        )
      }
    );
  }

  updateVolunteer = (id: string, data: any) => this.db.collection('volunteers').doc(id).update(data)
  updateNGO = (id: string, data: any) => this.db.collection('ngos').doc(id).update(data)
  updateOpportunity = (id: string, data: any) => this.db.collection('opportunities').doc(id).update(data)
  updateApplication = (id: string, data: any) => this.db.collection('applications').doc(id).update(data)

  deleteVolunteer = (volId: string) => {
    //1. get all applications of this volunteer
    this.getAllApplicationsOfVolunteer(volId).pipe(first()).subscribe(
      (applicationsArray) => {
        //and then delete them
        applicationsArray.map((application) => {
          const { id, opportunityId } = application;
          this.deleteApplication(id, volId, opportunityId)
        })
      }
    );
    //2. delete the object from volunteer collection
    return this.db.collection('volunteers').doc(volId).delete()
  }

  deleteNGO = (ngoId: string) => {
    //1. get all opportunities of this ngo
    this.getAllOpportunitiesOfNGO(ngoId).pipe(first()).subscribe(
      (opportunitiesArray) => {
        //and then delete them
        opportunitiesArray.map((opportunity) => {
          const { id } = opportunity;
          this.deleteOpportunity(id, ngoId)
        })
      }
    );
    //2. delete the object from ngo collection
    return this.db.collection('ngos').doc(ngoId).delete()
  }

  deleteOpportunity = (oppId: string, ngoId: string) => {
    //This version of delete is asyncronous

    //1. get ngo data, in particular count of opportunities
    this.getOne('ngos', ngoId).pipe(first()).subscribe(
      (fullNGOData: NGO) => {
        const opportunitiesCountNGO = fullNGOData.opportunitiesCount || 0;
        //update the count of opportunities on ngo
        return this.updateNGO(ngoId, {opportunitiesCount: opportunitiesCountNGO-1});}
    );
    //2. get all applications of this opportunity
    this.getAllApplicationsOfOpportunity(oppId).pipe(first()).subscribe(
      (applicationsArray) => {
        //and then delete them
        applicationsArray.map((application) => {
          const { id, volunteerId } = application;
          this.deleteApplication(id, volunteerId, oppId)
        })
      }
    );
    //3. delete the object from opportunities collection
    return this.db.collection('opportunities').doc(oppId).delete()
  }
  
  deleteApplication =  async (appId: string, volId: string, oppId: string) => {
    //This version of delete is syncronous (just for the fun of it)

    //get volunteer data, in particular count of applications
    this.getOne('volunteers', volId).pipe(first()).subscribe(
      async (fullVolData: Volunteer) => {
        console.log(fullVolData)
        const applicationsCountVol = fullVolData.applicationsCount || 0;
        //update the count of applications on volunteer
        await this.updateVolunteer(volId, {applicationsCount: applicationsCountVol-1});
        //get opportunities data
        this.getOne('opportunities', oppId).pipe(first()).subscribe(
          async (fullOppData: Opportunity) => {
            const applicationsCountOpp = fullOppData.applicationsCount || 0;
            //update the count of applications on opportunity
            await this.updateOpportunity(oppId, {applicationsCount: applicationsCountOpp-1});
            //delete the object from applications-collection
            return this.db.collection('applications').doc(appId).delete()
          }
        )
      }
    )
  }
}
