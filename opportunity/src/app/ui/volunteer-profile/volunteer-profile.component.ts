import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router';

import { FirebaseCrudService } from '../../data/services/firebase.service'
import { userDetailsSelector } from '../../user/user.reducers'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VolunteerapplicationsComponent } from './volunteerapplications/volunteerapplications.component'


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
    private fbService: FirebaseCrudService,
    private route: ActivatedRoute,
    private dialog: MatDialog
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
    this.fbService.getOne('volunteers', this.profileId)
      .subscribe(user => {
        this.profileVolunteer = user
        this.compare()
      })
  }

  compare() {
    if (this.currentUser && this.currentUser.id === this.profileId) {
      console.log('same user')
    } else {
      console.log('other user')
    }
  }

  seeApplications() {
    this.fbService.getAllApplicationsOfVolunteer(this.currentUser.id)
      .subscribe(applications => {
        this.dialog.open(VolunteerapplicationsComponent, { data: applications });
      })
  }

}
