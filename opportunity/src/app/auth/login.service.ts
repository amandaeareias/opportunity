import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private firebaseAuth: AngularFireAuth
  ) { }

  loginWithGoogle() {
    this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
