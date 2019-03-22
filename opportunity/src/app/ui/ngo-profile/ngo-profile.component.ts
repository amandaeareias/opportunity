import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { FirebaseCrudService } from '../../data/services/firebase.service'
import { MappingService } from '../../data/services/mapping.service'
import { userDetailsSelector } from '../../user/user.reducers'
import { CreateOpportunityComponent } from './create-opportunity/create-opportunity.component';
import { EditOpportunityComponent } from './opportunity-card-admin/edit-opportunity/edit-opportunity.component'

@Component({
  selector: 'app-ngo-profile',
  templateUrl: './ngo-profile.component.html',
  styleUrls: ['./ngo-profile.component.css']
})
export class NgoProfileComponent implements OnInit {

  profileNgo;
  profileId
  currentUser;
  profileOpportunities = [];
  profileOwner: boolean = false

  constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    private fbService: FirebaseCrudService,
    private store: Store<any>,
    private mappingService: MappingService,
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
    this.fbService.getOne('ngos', this.profileId)
      .subscribe(ngo => {
        this.profileNgo = ngo
        this.getprofileOpportunities()
        this.compare()
      })
  }

  getprofileOpportunities() {
    this.fbService.getAllOpportunitiesOfNGO(this.profileId)
      .subscribe(opportunities => this.profileOpportunities = opportunities)
  }

  compare() {
    if (this.currentUser && this.currentUser.id === this.profileId) {
      this.profileOwner = true;
    } else {
      // console.log('other user')
    }
  }

  createOpportunity() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(CreateOpportunityComponent, {data: this.currentUser})
  }

  editOpportunity(card) {
    let opportunity = card.opportunity
    this.dialog.open(EditOpportunityComponent, {data: opportunity})
  }


}


