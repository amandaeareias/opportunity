import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs';

import { FirebaseCrudService } from '../../data/services/firebase.service'
import { userDetailsSelector } from '../../user/user.reducers'

import { Volunteer } from 'src/app/data/models/volunteer.model';
import { NGO } from 'src/app/data/models/ngo.model';

import { VolunteerapplicationsComponent } from './volunteerapplications/volunteerapplications.component'

@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.css']
})
export class VolunteerProfileComponent implements OnInit {
  private userDetailsSubscription: Subscription;
  private dbVolunteerSubscription: Subscription;
  private dbApplicationsSubscription: Subscription;
  private currentUser: Volunteer | NGO;
  public volunteer: Volunteer;
  public isMe: boolean = false;

  constructor(
    private store: Store<any>,
    private db: FirebaseCrudService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    /* Invoiking getProfile() inside subscription */
    /* to make sure we've got user to compare */
    this.userDetailsSubscription = this.store.select(userDetailsSelector)
      .subscribe((user: Volunteer | NGO) => {
        this.currentUser = user;
        this.getProfile();
      })
  }

  ngOnDestroy() {
    this.userDetailsSubscription.unsubscribe();
    this.dbVolunteerSubscription && this.dbVolunteerSubscription.unsubscribe();
    this.dbApplicationsSubscription && this.dbApplicationsSubscription.unsubscribe();
  }

  getProfile(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.dbVolunteerSubscription = this.db.getOne('volunteers', id)
      .subscribe((volunteer: Volunteer) => {
        this.volunteer = volunteer;
        this.isMe = this.currentUser && this.currentUser.id === volunteer.id;
      })
  }

  openApplications(): void {
    this.dbApplicationsSubscription = this.db.getAllApplicationsOfVolunteer(this.currentUser.id)
      .subscribe((applications: any) => {
        this.dialog.open(VolunteerapplicationsComponent, { data: applications });
      })
  }

}
