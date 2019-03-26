import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { getUserState, UserState } from './user/user.reducers';
import { navbarUIStateSelector } from './ui/ui.reducers';
import { GOOGLE_LOGIN_SUCCESS, GET_USER_PENDING, GET_USER_LOCATION_PENDING } from './user/user.actions';

import { FirebaseCrudService } from './data/services/firebase.service'
import { MappingService } from './data/services/mapping.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private me: UserState;
  private navbarUIState: string;

  constructor(
    private auth: AngularFireAuth,
    private store: Store<any>,
    private db: FirebaseCrudService,
    private ms: MappingService,
  ) {}

  ngOnInit() {
    this.store.select(getUserState)
      .subscribe(user => {
        this.me = user;
        if (!user.location) {
          this.store.dispatch(new GET_USER_LOCATION_PENDING());
        }
      });

    this.store.select(navbarUIStateSelector)
      .subscribe(navbarUIState => this.navbarUIState = navbarUIState);

    this.auth.authState.subscribe(authResponse => {
      if (authResponse) {
        this.store.dispatch(new GOOGLE_LOGIN_SUCCESS());
        if (!this.me.isLoggedIn) {
          this.store.dispatch(new GET_USER_PENDING({
            logInEmail: authResponse.email,
            displayName: authResponse.displayName,
            photoURL: authResponse.photoURL,
            isNgo: this.parseNgoUIState(this.navbarUIState),
          }));
        }
      }
    });

    //TO BE DELETED

    //this.db.updateOpportunity('P5UzM6Uk4IEoPoN3Ieo0', {name: 'Change the world'})

    //this.db.updateNGO('OeSLCQZC0OTI97tY7st0', {name: 'Hiiii'})

    //this.db.searchByName('opportunities', 'O').subscribe(x => console.log(x));
    // const x = this.db.getAllReviewOfNGO('NBZCMGO9eVNM7aFgaqVf')
    // x.subscribe(x=> console.log(x))

    // const review = {
    //   ngoId: 'NBZCMGO9eVNM7aFgaqVf',
    //   volunteerId: '9Ceu0TrxYTFYKHtKi3x8',
    //   rating: 4,
    //   text: 'whatever'
    // } 
    // const maped = this.ms.mapReviewInputToProps(review)
    // console.log('here')
    // this.db.createReview(maped)

    
    // const x = this.db.getAllReviewOfNGO('NBZCMGO9eVNM7aFgaqVf')

    //this.db.getAllApplicationsOfOpportunity('2tX7RWp7MaVcPox5bAhU').subscribe((res) => console.log(res))
    //this.db.deleteApplication('5f6agl130RnZjoJ9jcSl', 'PDgzHTyTvCQLvu4yL9hN', '2mVEFD2D2jYjhoMYHI79');

    //this.db.deleteVolunteer('zWeXSt8tWNsVYk7IHpj8');
    // console.log("here")
    // this.db.createApplication(this.mapper.mapApplicationInputToProps({
    //   volunteerId: 'A4oCTZQRm90E7G5SwuFG',
    //   opportunityId: '09sgwsfd4DHFLEjFBjpQ',
    //   text: 'please, let it work',
    // }));
    // this.db.createOpportunity(this.mapper.mapOpportunityInputToProps({
    //   id: 'zB1wkI6n9yhfBhGwSPNX',
    //   name: 'Igor Snitkin',
    //   image: 'photo',
    // }, {
    //   name: 'English for kids',
    //   about: 'Something',
    //   location: 'Somewhere',
    //   prerequisites: ['English', 'kids'],
    // }));
  }

  /* @TODO: Move helper functions to the dedicated service */
  parseNgoUIState(uiState: string): boolean {
    return /^NGO/i.test(uiState);
  }

}

