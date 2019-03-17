import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {
  constructor(public db: AngularFirestore) {}

  // CRUDs
  // 1st argument is always collection name: 'ngos' or 'volunteers' or 'opportunities' or 'applications'
  // 2nd arguments are relevant parameters
  create(collection, newObject) {
    return this.db.collection(collection).add(newObject);
  }

  getOne(collection, objectKey) {
    return this.db.collection(collection).doc(objectKey);
  }

  update(collection, objectKey, newObjectData) {
    return this.db
      .collection(collection)
      .doc(objectKey)
      .set(newObjectData);
  }

  delete(collection, objectKey) {
    return this.db
      .collection(collection)
      .doc(objectKey)
      .delete();
  }

  getMany<T>(collection: string, queryFn?: QueryFn) {
    return this.db.collection<T>(collection, queryFn);
  }
}
