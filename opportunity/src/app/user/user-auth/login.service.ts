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
    private db: FirebaseCrudService,
  ) { }

  loginWithGoogle() {
    this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  registerUser(userLoginData: { logInEmail: string, photoURL: string, displayName: string }, isNgo: boolean) {
    const { logInEmail, photoURL, displayName } = userLoginData;
    
    /* Subject observable is used to append db responses */
    let subject$ = new Subject();
    
    /* Fetch list of volunteers and NGO's and check which one(s) is empty */
    /* with combineLatest method */
    const vol$ = this.db.getMany('volunteers', (ref) => ref.where('username', '==', logInEmail));
    const ngo$ = this.db.getMany('ngos', (ref) => ref.where('username', '==', logInEmail));
    combineLatest(
      vol$,
      ngo$,
      (vol, ngo) => vol.length
        ? { type: 'volunteer', data: vol[0] }
        : ngo.length
          ? { type: 'ngo', data: ngo[0] }
          : { type: '404' }
    )
    /* Subscribe to combineLatest response */
      .subscribe(async (res) => {
        switch(res.type) {
          case 'volunteer':
          case 'ngo':
            subject$.next({
              isNgo: res.type === 'ngo',
              user: res.data,
            })
            break;

          case '404':
          default:
          let user;
          isNgo
            ? user = await this.db.createNGO({
                name: displayName,
                username: logInEmail,
                image: photoURL,
              })
            : user = await this.db.createVolunteer({
                name: displayName,
                username: logInEmail,
                image: photoURL,
              });
          subject$.next({
            isNgo,
            user,
          });
        }
    });

    return subject$;
  }

  signOut() {
    return this.firebaseAuth.auth.signOut();
  }
}
