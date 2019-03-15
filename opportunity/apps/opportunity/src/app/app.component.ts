import { Component, OnDestroy } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'opp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // check why the type definition is buggy
  ngos$;

  constructor(private db: AngularFirestore) {
    this.ngos$ = db.collection('ngo').valueChanges()
  }

  update(item){
    console.log(item.id, "i am the item")
        this.db.collection('ngo').doc('WM8CPsEg223CeSCMLeit').delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });;

    // this.db.collection('ngo').doc(item.name).update(' UPDATED')
    // doc('ngo').update(item.name + ' worked')
  }

}
