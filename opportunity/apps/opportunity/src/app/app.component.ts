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

  constructor(db: AngularFirestore) {
    this.ngos$ = db.collection('ngo').valueChanges()
  }

}
