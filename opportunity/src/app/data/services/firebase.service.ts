import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

import { NGO } from '../models/ngo.model';
import { Volunteer } from '../models/volunteer.model';
import { Opportunity } from '../models/opportunity.model';
import { Application } from '../models/application.model';
import {map} from 'rxjs/operators'

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

  /* generic getters */
  getOne(collection: string, id: string) {
    return this.db.collection(collection).doc(id).valueChanges();
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
  createVolunteer(volunteer: Volunteer) {
    return this.db.collection('volunteers').add({ ...new Volunteer(), ...volunteer });
  }

  createNGO(ngo: NGO) {
    return this.db.collection('ngos').add({ ...new NGO(), ...ngo });
  }

  updateVolunteer(id: string, data: any) {
    return this.db.collection('volunteers').doc(id).update(data);
  }

  updateNGO(id: string, data: any) {
    return this.db.collection('ngos').doc(id).update(data);
  }

  /* @TODO: Review and test delete functions */

  deleteVolunteer(objectKey: string) {
    return this.db.collection('volunteers').doc(objectKey).delete();
  }
  deleteNGO(objectKey: string) {
    return this.db.collection('ngos').doc(objectKey).delete();
  }

  //CRUD secondary objects (opportunity, application)
  async createOpportunity(newObject: Opportunity) {
    //first creating new doc in the opportunities collection
    const docRef = await this.db.collection('opportunities').add(newObject);

    //get the created object back
    const opportunity = await docRef.get();

    //update the ngo data with the new opportunity, using the same id
    await this.db.collection('ngos')
      .doc(newObject.ngo.id)
      .collection('opportunity')
      .doc(docRef.id)
      .set(newObject)

    return opportunity.data();
  }

  async createApplication(newObject: Application) {
    //first creating new doc in the applications collection
    const docRef = await this.db.collection('applications').add(newObject);

    //get the created object back
    const application = await docRef.get();

    //update the opportunity data with the new application, using the same id
    await this.db.collection('opportunities')
      .doc(newObject.opportunityId)
      .collection('application')
      .doc(docRef.id)
      .set(newObject)

    //update the volunteer data with the new application, using the same id
    await this.db.collection('volunteers')
      .doc(newObject.volunteerId)
      .collection('application')
      .doc(docRef.id)
      .set(newObject)

    return application.data();
  }

    // //CRUD secondary objects (opportunity, application)
    // async createOpportunity(newObject: Opportunity) {
    //   //first creating new doc in the opportunities collection
    //   const docRef = await this.db.collection('opportunities').add(newObject);
    //   // when done creating, start updating the ngos collection
    //   //by first getting all the opportunities of the relevant ngo
    //   this.db.collection('ngos').doc(newObject.ngo.id).get()
    //     .subscribe(data => {
    //       const ngosOpportunities = data.get('opportunity');
    //       //as we want to find/identify the opportunities quickly, we save them as keys
    //       const newOpportunity = {};
    //       newOpportunity[docRef.id] = newObject;
    //       //and then updating the ngos collection
    //       this.db.collection('ngos').doc(newObject.ngo.id).update({opportunity: {...ngosOpportunities, ...newOpportunity}});
    //       //probably do not need the full opportunity object
    //     })
    //   const opportunity = await docRef.get();
    //   console.log(opportunity.data());
    //   return opportunity.data();
    // }

  // createApplication(newObject: Application) {
  //   //I. update opportunities collection
  //   //first, find the relevant opportunity in opportunities collection
  //   this.db.collection('opportunities').doc(newObject.opportunityId).get()
  //   //what only works by subscribing
  //     .subscribe(data => {
  //       //then, get all the existing applications of the opportunity,
  //       const oppApplications = data.get('application');
  //       //create new application object to be stored in the opportunity
  //       const newApplication = {};
  //       // Where do I get newObject ID???
  //       // newApplication[newObject.id] = {
  //       //   volunteerId: newObject.volunteerId,
  //       //   timeCreated: newObject.timeCreated,
  //       //   active: newObject.active
  //       // };
  //       //and update the opportunities collection document
  //       this.db.collection('opportunities').doc(newObject.opportunityId).update({application: {...oppApplications, ...newApplication}});


  //       //II. update volenteers collection
  //       //now start update the volunteer data (same logic)
  //       // this.db.collection('volunteers').doc(newObject.volunteerId).get()
  //       //   .subscribe(data => {
  //       //     const volApplications = data.get('application');
  //       //     const newApplication = {};
  //       //     newApplication[newObject.id] = {
  //       //       opportunityId: newObject.opportunityId,
  //       //       timeCreated: newObject.timeCreated,
  //       //       active: newObject.active
  //       //     };
  //       //     this.db.collection('volunteers').doc(newObject.volunteerId).update({application: {...volApplications, ...newApplication}});
  //       //   })
  //     })
  // }
}
