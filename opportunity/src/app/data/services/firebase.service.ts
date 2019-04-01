import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { toLower, deburr, isObject } from 'lodash';

import { NGO } from '../models/ngo.model';
import { Volunteer } from '../models/volunteer.model';
import { Opportunity } from '../models/opportunity.model';
import { Application } from '../models/application.model';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {
  constructor(private db: AngularFirestore) {}

  /* NOTE: getOne returns undefined if document isn't found */
  getOne<T>(collection: string, id: string) {
    return this.db.collection<T>(collection).doc(id).valueChanges()
      .pipe(
        map(data => ({ id, ...data })),
      );
  }

  /* getMany uses optional QueryFn type for querying DB: */
  /* QueryFn: (ref) => ref.where('fieldName', 'operator', 'fieldValue') */
  getMany<T>(collection: string, queryFn?: QueryFn) {
    return this.db.collection<T>(collection, queryFn).snapshotChanges()
      .pipe(
        map(snapshots => snapshots.map((snapshot) => {
          const data = snapshot.payload.doc.data();
          const id = snapshot.payload.doc.id;
          return {id, ...data};
        }),
      ),
    );
  }

  /* Please note that Query Function in getMany doesn't support search operators */
  /* hence search method */
  search<T>(collection: string, field: string, query: string) {
    return this.getMany<T>(collection)
      .pipe(
        map((data: any[]) => data.filter((doc) => {
          return doc[field] && typeof doc[field] === 'string'
            ? this.normalizeSearchQuery(doc[field]).includes(this.normalizeSearchQuery(query))
            : false;
        })),
      )
  }

  addOne(collection: string, doc: any) {
    return this.db.collection(collection).add(doc);
  }

  updateOne(collection: string, id: string, data: any) {
    return this.db.collection(collection).doc(id).update(data);
  }

  deleteOne(collection: string, id: string) {
    return this.db.collection(collection).doc(id).delete();
  }

  /*********** Model-specific methods *************/
  /*                                              */
  /*                    NGO                       */
  /*                                              */
  /************************************************/

  addNGO(ngo: NGO) {
    return this.addOne('ngos', ngo);
  }

  updateNGO(id: string, data: any) {
    const subscription = this.getAllOpportunitiesOfNGO(id)
      .subscribe((opportunities) => {
        Promise.all(opportunities.map((opportunity: any) => {
          return this.updateOpportunity(opportunity.id, {
            ngo: this.reduceData(data, ['id', 'category', 'name', 'image']),
          });
        })).then(() => {
          subscription.unsubscribe();
          this.updateOne('ngos', id, this.trimDataInput(data));
        });
      });
      return true;
  }

  deleteNGO(id: string) {
    const subscription = this.getAllOpportunitiesOfNGO(id)
      .subscribe((opportunities) => {
        Promise.all(opportunities.map((opportunity) => {
          return this.deleteOpportunity(opportunity.id)
        })).then(() => {
          subscription.unsubscribe();
          this.deleteOne('ngos', id);
        });
      });
  }

  getAllOpportunitiesOfNGO(id: string) {
    return this.getMany('opportunities', ref => ref.where('ngo.id', '==', id));
  }

  getAllReviewsOfNGO(id: string) {
    return this.getMany(`ngos/${id}/reviews`);
  }

  /*********** Model-specific methods *************/
  /*                                              */
  /*                 Volunteer                    */
  /*                                              */
  /************************************************/

  addVolunteer(volunteer: Volunteer) {
    return this.addOne('volunteers', volunteer);
  }

  updateVolunteer(id: string, data: any) {
    this.updateOne('volunteers', id, this.trimDataInput(data));
    return true
  }

  deleteVolunteer(id: string) {
    const subscription = this.getAllApplicationsOfVolunteer(id)
      .subscribe((applications) => {
        Promise.all(applications.map((application: any) => {
          return this.deleteApplication(application.id);
        })).then(() => {
          subscription.unsubscribe();
          this.deleteOne('volunteers', id);
        });
      });
  }

  getAllApplicationsOfVolunteer(id: string) {
    return this.getMany('applications', ref => ref.where('volunteerId', '==', id));
  }

  /*********** Model-specific methods *************/
  /*                                              */
  /*                Opportunity                   */
  /*                                              */
  /************************************************/

  addOpportunity(opportunity: Opportunity) {
    return this.addOne('opportunities', opportunity);
  }

  updateOpportunity(id: string, data: any) {
    const subscription = this.getAllApplicationsOfOpportunity(id)
      .subscribe((applications) => {
        Promise.all(applications.map((application) => {
          return this.updateApplication(application.id, {
            opportunityData: this.trimDataInput(data),
          });
        })).then(() => {
          subscription.unsubscribe();
          this.updateOne('opportunities', id, this.trimDataInput(data));
        });
      });
  }

  deleteOpportunity(id: string) {
    const subscription = this.getAllApplicationsOfOpportunity(id)
      .subscribe((applications) => {
        console.log(applications)
        Promise.all(applications.map((application: any) => {
          return this.deleteApplication(application.id);
        })).then(() => {
          subscription.unsubscribe();
          this.deleteOne('opportunities', id);
        });
      });
  }

  getAllApplicationsOfOpportunity(id: string) {
    return this.getMany('applications', ref => ref.where('opportunityId', '==', id));
  }

  /*********** Model-specific methods *************/
  /*                                              */
  /*                  Application                 */
  /*                                              */
  /************************************************/

  addApplication(application: Application) {
    return this.addOne(`applications`, application);
  }

  updateApplication(id: string, data: any) {
    return this.updateOne('applications', id, this.trimDataInput(data));
  }

  deleteApplication(id: string) {
    return this.deleteOne('applications', id);
  }

  /*********** Model-specific methods *************/
  /*                                              */
  /*                    Review                    */
  /*                                              */
  /************************************************/


  addReview(review: Review) {
    const { ngoId } = review;
    return this.addOne(`ngos/${ngoId}/reviews`, review);
  }

  updateReview(ngoId: string, reviewId: string, text: string) {
    return this.updateOne(`ngos/${ngoId}/reviews`, reviewId, { text });
  }

  deleteReview(ngoId: string, reviewId: string) {
    return this.deleteOne(`ngos/${ngoId}/reviews`, reviewId);
  }

  /************************************************/
  /*                                              */
  /*                   HELPERS                    */
  /*                                              */
  /************************************************/

  private normalizeSearchQuery(str: string): string {
    return deburr(toLower(str));
  }

  private trimDataInput(data: object): object {
    Object.keys(data).forEach((key) => {
      if (isObject(data[key])) {
        data[key] = this.trimDataInput(data[key]);
      }
      if (data[key] === '' || data[key] === undefined) {
        delete data[key];
      }
    });

    return data;
  }

  private reduceData(data: any, keys: string[]) {
    const result = {};
    keys.forEach(key => result[key] = data[key]);
    return this.trimDataInput(result);
  }
}