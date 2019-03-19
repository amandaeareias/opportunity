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

  //gets
  getOne(collection: string, objectKey: string) {
    return this.db.collection(collection).doc(objectKey).valueChanges();
  }

  getMany<T>(collection: string, queryFn?: QueryFn) {
    return this.db.collection<T>(collection, queryFn).snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data()
        const id = action.payload.doc.id;
        return {id, ...data}
      }))
    );
  }

  //CRUD basic objects (NGO, volunteer)
  createVolunteer(newObject: Volunteer) {
    return this.db.collection('volunteers').add(newObject);
  }
  createNGO(newObject: NGO) {
    return this.db.collection('ngos').add(newObject);
  }
  updateVolunteer(objectKey: string, newObjectData: Volunteer) {
    return this.db.collection('volunteers').doc(objectKey).update(newObjectData);
  }
  updateNGO(objectKey: string, newObjectData: NGO) {
    return this.db.collection('ngos').doc(objectKey).update(newObjectData);
  }
  deleteVolunteer(objectKey: string) {
    return this.db.collection('volunteers').doc(objectKey).delete();
  }
  deleteNGO(objectKey: string) {
    return this.db.collection('ngos').doc(objectKey).delete();
  }

  //CRUD secondary objects (opportunity, application)
  createOpportunity(newObject: Opportunity) {
    //first creating new doc in the opportunities collection
    const opportunity = this.db.collection('opportunities').add(newObject);
    //when done creating, start updating the ngos collection
    opportunity.then(docRef => {
      //by first getting all the opportunities of the relevant ngo
      this.db.collection('ngos').doc(newObject.ngo.id).get()
        //what only works by subscribing
        .subscribe(data => {
          const ngosOpportunities = data.get('opportunity');
          //as we want to find/identify the opportunities quickly, we save them as keys
          const newOpportunity = {};
          newOpportunity[docRef.id] = newObject;
          //and then updating the ngos collection
          this.db.collection('ngos').doc(newObject.ngo.id).update({opportunity: {...ngosOpportunities, ...newOpportunity}}); //probably do not need the full opportunity object
        })
    });
    return opportunity;
  }

  createApplication(newObject: Application) {
    //I. update opportunities collection
    //first, find the relevant opportunity in opportunities collection
    this.db.collection('opportunities').doc(newObject.opportunityId).get()
    //what only works by subscribing
      .subscribe(data => {
        //then, get all the existing applications of the opportunity,
        const oppApplications = data.get('application');
        //create new application object to be stored in the opportunity
        const newApplication = {};
        newApplication[newObject.id] = {
          volunteerId: newObject.volunteerId,
          timeCreated: newObject.timeCreated,
          active: newObject.active
        };
        //and update the opportunities collection document
        this.db.collection('opportunities').doc(newObject.opportunityId).update({application: {...oppApplications, ...newApplication}});


        //II. update volenteers collection
        //now start update the volunteer data (same logic)
        this.db.collection('volunteers').doc(newObject.volunteerId).get()
          .subscribe(data => {
            const volApplications = data.get('application');
            const newApplication = {};
            newApplication[newObject.id] = {
              opportunityId: newObject.opportunityId,
              timeCreated: newObject.timeCreated,
              active: newObject.active
            };
            this.db.collection('volunteers').doc(newObject.volunteerId).update({application: {...volApplications, ...newApplication}});
          })
      })
  }
}
