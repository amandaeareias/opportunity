import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

import { NGO } from '../models/ngo.model';
import { Volunteer } from '../models/volunteer.model';
import { Opportunity } from '../models/opportunity.model';
import { Application } from '../models/application.model';
import { Review } from '../models/review.model';
import {map, first, filter } from 'rxjs/operators'
import {Observable} from 'rxjs';
import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {
  constructor(public db: AngularFirestore) {}

  /* Search */
  searchByName<T>(collection: string, word: string) { //Usage: ...searchByName('opportunities', 'xxx').subscribe((arrayOfMatches) => {...});
    return this.db.collection<T>(collection).snapshotChanges().pipe(
      map(actions => {
        let result:any = actions.map(action => {
        const data = action.payload.doc.data()
        const id = action.payload.doc.id;
        return {id, ...data};
        })
        return result = result.filter((el:any) => {return el.name.toLowerCase().includes(word.toLowerCase())})
      }),
    );
  }

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

  getAllReviewOfNGO(ngoId: string) {
    return this.db.collection('ngos/'+ngoId+'/reviews').snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data: any = action.payload.doc.data()
        const id = action.payload.doc.id;
        data.id = id;
        return data;
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
    return this.db.collection<T>(collection, queryFn)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data()
          const id = action.payload.doc.id;
          return {id, ...data};
        }),
      ),
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
        await this.db.collection('ngos').doc(opportunity.ngo.id).update({opportunitiesCount: opportunitiesCountNgo+1})
        return this.db.collection('opportunities').add({ ...new Opportunity(), ...opportunity });
      }
    )
  }

  createReview = async (review: Review) => {
    const { volunteerId } = review;
    this.getOne('volunteers', volunteerId).pipe(first()).subscribe(
      async (fullVolunteerData: Volunteer) => {
        review.volunteerName = fullVolunteerData.name;
        review.volunteerImage = fullVolunteerData.image;
        const path = 'ngos/'+ review.ngoId
        await this.db.doc(path).collection('reviews').add({ ...new Review(), ...review })
        const path2 = path + '/reviews'
        return this.getMany(path2).subscribe(
          (reviewsArray: any) => {
            const average = Math.round(reviewsArray.reduce((a,b) => { return a+(b.rating || 0) }, 0)/reviewsArray.length);
            return this.db.collection('ngos').doc(review.ngoId).update({rating: average})
          }
        )

      }
    )
  }

  createApplication = (application: Application) => {
    const { volunteerId, opportunityId } = application;
    this.getOne('volunteers', volunteerId).pipe(first()).subscribe(
      (fullVolunteerData: Volunteer) => {
        return this.getOne('opportunities', opportunityId).pipe(first()).subscribe(
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

            await this.db.collection('volunteers').doc(volunteerId).update({applicationsCount: applicationsCountVol+1})
            await this.db.collection('opportunities').doc(opportunityId).update({applicationsCount: applicationsCountOpp+1})
            return this.db.collection('applications').add({ ...new Application(), ...application, ...addedData });
          }
        )
      }
    );
  }

  updateVolunteer = (volId: string, data: any) => {
    //1. check for updates relevant for the applications of this volunteer
    const {name, image} = data;
    const volData: any = {volunteerData: {}};
    if (name) {
      volData.volunteerData.name = name;
    }
    if (image) {
      volData.volunteerData.image = image;
    }

    //2. get all applications of this volunteer
    this.getAllApplicationsOfVolunteer(volId).pipe(first()).subscribe(
      (applicationsArray) => {
        //and then update them
        applicationsArray.map((application: any) => this.updateApplication(application.id, volData))
      }
    );
    //3. update the object in the volunteer collection
    return this.db.collection('volunteers').doc(volId).update(data)
  }

  updateNGO = (ngoId: string, data: any) => {
    //1. check for updates relevant for the opportunities of this ngo
    const {name, image, category} = data;
    const ngoData: any = {ngo: {}}
    if (name) {
      ngoData.ngo.name = name;
    }
    if (image) {
      ngoData.ngo.image = image;
    }
    if (category) {
      ngoData.ngo.category = category;
    }

    //2. get all opportunities of this ngo
    this.getAllOpportunitiesOfNGO(ngoId).pipe(first()).subscribe(
      (opportunitiesArray) => {
        //and then update them
        Promise.all(opportunitiesArray.map(
          (opportunity: any) => this.updateOpportunity(opportunity.id, ngoData)))
          .then(() => this.db.collection('ngos').doc(ngoId).update(data))
      }
    );
  }

  updateOpportunity = (oppId: string, data: any) => {
    //1. check for updates relevant for the applications of this opportunity
    const {ngo, name, about, location, prerequisites, active} = data;
    const oppData: any = {opportunityData: {}};
    if (ngo && ngo.name) {
      oppData.opportunityData.ngo.name = ngo.name;
    };
    if (ngo && ngo.image) {
      oppData.opportunityData.ngo.image = ngo.image;
    };
    if (ngo && ngo.category) {
      oppData.opportunityData.ngo.category = ngo.category;
    };
    if (name) {
      oppData.opportunityData.name = name;
    };
    if (location) {
      oppData.opportunityData.location = location;
    };
    if (prerequisites) {
      oppData.opportunityData.prerequisites = prerequisites;
    };
    if (active) {
      oppData.opportunityData.active = active;
    };
    if (about) {
      oppData.opportunityData.about = about;
    };

    //2. get all applications of this opportunity
    this.getAllApplicationsOfOpportunity(oppId).pipe(first()).subscribe(
      (applicationsArray) => {
        //and then update them
        applicationsArray.map((application: any) => this.updateApplication(application.id, oppData))
      }
    );
    //3. update the object in the opportunities collection
    return this.db.collection('opportunities').doc(oppId).update(data)
  }

  updateApplication = (id: string, data: any) => this.db.collection('applications').doc(id).update(data)

  deleteVolunteer = (volId: string) => {
    //1. get all applications of this volunteer
    this.getAllApplicationsOfVolunteer(volId).pipe(first()).subscribe(
      (applicationsArray) => {
        //and then delete them
        const promisesArray = [];
        applicationsArray.map((application: any) => {
          const { id, opportunityId } = application;
          promisesArray.push(this.deleteApplication(id, volId, opportunityId))
        })
        Promise.all(promisesArray).then(() =>
          //2. delete the object from volunteer collection
          this.db.collection('volunteers').doc(volId).delete()
        )
      }
    );
  }

  deleteNGO = (ngoId: string) => {
    //1. get all opportunities of this ngo
    this.getAllOpportunitiesOfNGO(ngoId).pipe(first()).subscribe(
      (opportunitiesArray) => {
        //and then delete them
        Promise.all(opportunitiesArray.map((opportunity) => {
          const { id } = opportunity;
          this.deleteOpportunity(id, ngoId)
        })).then(() =>
          //2. delete the object from ngo collection
          this.db.collection('ngos').doc(ngoId).delete()
        )
      }
    );
  }

  deleteOpportunity = (oppId: string, ngoId: string) => {
    //This version of delete is asyncronous

    //1. get ngo data, in particular count of opportunities
    return this.getOne('ngos', ngoId).pipe(first()).subscribe(
      async (fullNGOData: NGO) => {
        const opportunitiesCountNGO = fullNGOData.opportunitiesCount || 0;
        //update the count of opportunities on ngo
        await this.db.collection('ngos').doc(ngoId).update({opportunitiesCount: opportunitiesCountNGO-1})

        //2. get all applications of this opportunity
        return this.getAllApplicationsOfOpportunity(oppId).pipe(first()).subscribe(
        (applicationsArray) => {
          //and then delete them
          const promisesArray = [];
          applicationsArray.map((application: any) => {
            const { id, volunteerId } = application;
            promisesArray.push(this.deleteApplication(id, volunteerId, oppId))
          })
          return Promise.all(promisesArray).then(() =>
            //3. delete the object from opportunities collection
            this.db.collection('opportunities').doc(oppId).delete()
          )
        }
      );
      }
    );
  }

  deleteApplication =  async (appId: string, volId: string, oppId: string) => {
    //This version of delete is syncronous (just for the fun of it)

    //get volunteer data, in particular count of applications
    return this.getOne('volunteers', volId).pipe(first()).subscribe(
      async (fullVolData: Volunteer) => {
        const applicationsCountVol = fullVolData.applicationsCount || 0;
        //update the count of applications on volunteer
        await this.db.collection('volunteers').doc(volId).update({applicationsCount: applicationsCountVol-1});
        //get opportunities data
        return this.getOne('opportunities', oppId).pipe(first()).subscribe(
          async (fullOppData: Opportunity) => {
            const applicationsCountOpp = fullOppData.applicationsCount || 0;
            //update the count of applications on opportunity
            await this.db.collection('opportunities').doc(oppId).update({applicationsCount: applicationsCountOpp-1});
            //delete the object from applications-collection
            return this.db.collection('applications').doc(appId).delete()
          }
        )
      }
    )
  }
}
