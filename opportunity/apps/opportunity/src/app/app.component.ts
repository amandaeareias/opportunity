import { Component, OnDestroy } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'opp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // check why the type definition is buggy
  ngos$: Observable<any[]>

  constructor(private db: AngularFirestore) {
    this.ngos$ = db.collection('ngo').snapshotChanges().pipe(map(actions => actions.map(action=> {
     const data = action.payload.doc.data()
     const id = action.payload.doc.id;
     return {id, ...data}
    })));
  }

  update(item) {
    console.log(item, 'i am the item');
    this.db
      .collection('ngo')
      .doc(item.id)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });

    // this.db.collection('ngo').doc(item.name).update(' UPDATED')
    // doc('ngo').update(item.name + ' worked')
  }
}
