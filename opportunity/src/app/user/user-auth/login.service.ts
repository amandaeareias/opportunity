import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { combineLatest, Subject } from 'rxjs';

import { FirebaseCrudService } from '../../data/services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: FirebaseCrudService
  ) {}

  loginWithGoogle() {
    this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  checkIfUserExists(
    userLoginData: {
      username: string;
      photoURL: string;
      displayName: string;
    },
    isNgo: boolean,
    isComplete: boolean
  ) {
    const { username, photoURL, displayName } = userLoginData;

    /* Subject observable is used to append db responses */
    const subject$ = new Subject();

    /* Fetch list of volunteers and NGO's and check which one(s) is empty */
    /* with combineLatest method */
    const vol$ = this.db.getMany('volunteers', ref =>
      ref.where('username', '==', username)
    );
    const ngo$ = this.db.getMany('ngos', ref =>
      ref.where('username', '==', username)
    );
    combineLatest(vol$, ngo$, (vol, ngo) =>
      vol.length
        ? { type: 'volunteer', data: vol[0] }
        : ngo.length
        ? { type: 'ngo', data: ngo[0] }
        : { type: '404' }
    )
      /* Subscribe to combineLatest response */
      .subscribe(async res => {
        switch (res.type) {
          case 'volunteer':
          case 'ngo':
            subject$.next({
              isNgo: res.type === 'ngo',
              isComplete: true,
              user: res.data
            });
            break;

          case '404':

            subject$.next({
              isNgo,
              isComplete: false,
              user: {
                displayName,
                photoURL,
                username
              }
            });
        }

      });
    return subject$;
  }
}
