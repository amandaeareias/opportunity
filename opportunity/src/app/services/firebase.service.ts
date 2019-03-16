import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  //CRUDs
  //1st argument is always collection name: 'ngos' or 'volunteers' or 'opportunities' or 'applications'
  //2nd arguments are relevant parameters
  create(collection, newObject){
    return this.db.collection(collection).add(newObject);
  }

  getOne(collection, objectKey){
    return this.db.collection(collection).doc(objectKey).snapshotChanges();
  }

  update(collection, objectKey, newObjectData){
    return this.db.collection(collection).doc(objectKey).set(newObjectData);
  }

  delete(collection, objectKey){
    return this.db.collection(collection).doc(objectKey).delete();
  }

  getMany(collection){
    return this.db.collection(collection).snapshotChanges();
  }
  
}
