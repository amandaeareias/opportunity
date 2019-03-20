import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import {FirebaseCrudService} from '../../data/services/firebase.service'
import {userDetailsSelector} from '../../user/user.reducers'
import {CreateOpportunityComponent} from './create-opportunity/create-opportunity.component';

@Component({
  selector: 'app-ngo-profile',
  templateUrl: './ngo-profile.component.html',
  styleUrls: ['./ngo-profile.component.css']
})
export class NgoProfileComponent implements OnInit {

  profileNgo;
  profileId
  currentUser;
  profileOpportunities;
  profileOpportunitiesQuantity;
  profileOwner: boolean = false

  constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    private service: FirebaseCrudService,
    private store: Store<any>,
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
      this.getProfileNgo()
    })
  }

  getProfileNgo() {
    this.profileId = this.route.snapshot.paramMap.get('id')
    this.service.getOne('ngos', this.profileId)
      .subscribe(ngo => {
        this.profileNgo = ngo
        this.getprofileOpportunities()
        this.compare()
      })
  }

  getprofileOpportunities() {
    this.profileOpportunities = this.profileNgo.opportunity
    this.profileOpportunitiesQuantity = Object.keys(this.profileOpportunities).length
  }

  compare() {
    if(this.currentUser.id === this.profileId) {
      this.profileOwner = true;
    } else {
      console.log('other user')
    }
  }


  createOpportunity() {
    this.dialog.open(CreateOpportunityComponent);
  }

  newOpportunity() {
    console.log('got here')
  }


}
