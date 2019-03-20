import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router';

import { FirebaseCrudService } from '../../data/services/firebase.service'
import {userDetailsSelector} from '../../user/user.reducers'


@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.css']
})
export class VolunteerProfileComponent implements OnInit {

  currentUser;
  profileVolunteer;
  profileId;

  constructor(
    private store: Store<any>,
    private service: FirebaseCrudService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getCurrentUser()
    this.route.params.subscribe(routeParams => {
      this.getCurrentUser()
    });
  }

  getCurrentUser() {
    this.store.select(userDetailsSelector)
      .subscribe(user => {
        this.currentUser = user;
        this.getProfile()
      })
  }

  getProfile() {
    this.profileId = this.route.snapshot.paramMap.get('id')
    this.service.getOne('volunteers', this.profileId)
      .subscribe(user => {
        this.profileVolunteer = user
        this.compare()
    })
  }

  compare() {
    console.log(this.profileVolunteer)
    if(this.currentUser.id === this.profileId) {
      console.log('same user')
    } else {
      console.log('other user')
    }
  }

}
