import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { FirebaseCrudService } from '../../data/services/firebase.service';
import { UserState, getUserState } from '../../user/user.reducers';

import { Volunteer } from 'src/app/data/models/volunteer.model';
import { NGO } from 'src/app/data/models/ngo.model';
import { Opportunity } from 'src/app/data/models/opportunity.model';
import { Review } from 'src/app/data/models/review.model';

import { CreateOpportunityComponent } from './create-opportunity/create-opportunity.component';
import { EditOpportunityComponent } from './opportunity-card-admin/edit-opportunity/edit-opportunity.component';

@Component({
  selector: 'app-ngo-profile',
  templateUrl: './ngo-profile.component.html',
  styleUrls: ['./ngo-profile.component.css']
})
export class NgoProfileComponent implements OnInit {
  private userDetailsSubscription: Subscription;
  private dbNgoSubscription: Subscription;
  private dbOpportunitiesSubscription: Subscription;
  private dbReviewsSubscription: Subscription;
  private dbVolunteerSubscription: Subscription;
  public currentUser: UserState;
  public ngo: NGO;
  public opportunities: Opportunity[] = [];
  public reviews: Review[] = [];
  public ngoRating: number;
  public isMe: boolean;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private db: FirebaseCrudService,
    private store: Store<any>,
  ) { }

  ngOnInit() {
    /* Invoiking getProfile() inside subscription */
    /* to make sure we've got user to compare */
    
    this.route.params.subscribe(() => {
      this.getCurrentUser();
    });
  }
  
  ngOnDestroy() {
    this.userDetailsSubscription && this.userDetailsSubscription.unsubscribe();
    this.dbNgoSubscription && this.dbNgoSubscription.unsubscribe();
    this.dbOpportunitiesSubscription && this.dbOpportunitiesSubscription.unsubscribe();
    this.dbReviewsSubscription && this.dbReviewsSubscription.unsubscribe();
    this.dbVolunteerSubscription && this.dbVolunteerSubscription.unsubscribe();
  }
  
  getCurrentUser() {
    this.userDetailsSubscription && this.userDetailsSubscription.unsubscribe();
    this.userDetailsSubscription = this.store.select(getUserState)
      .subscribe((user: UserState) => {
        this.currentUser = user;
        this.getProfile();
      });
  }

  getProfile() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dbNgoSubscription = this.db.getOne('ngos', id)
      .subscribe((ngo: any) => {
        this.ngo = ngo;
        this.isMe = this.currentUser.user && this.currentUser.user.id === id;
      });

    this.dbOpportunitiesSubscription = this.db.getAllOpportunitiesOfNGO(id)
      .subscribe((opportunities: any) => {
        this.opportunities = opportunities;
      });
    
    this.dbReviewsSubscription = this.db.getAllReviewsOfNGO(id)
      .subscribe((reviews: any[]) => {
        reviews.map((review: Review) => {
          this.db.getOne('volunteers', review.volunteerId)
            .subscribe((volunteer: any) => {
              if (volunteer) {
                const { name, image } = volunteer;
                review.volunteerName = name;
                review.volunteerImage = image;
              }
            });
        });
        this.reviews = reviews;
        this.ngoRating = Math.round(reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length);
        this.reviews = this.reviews
          .sort((a: Review, b: Review) => new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime());
      });
  }

  createOpportunity() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CreateOpportunityComponent, { data: this.currentUser.user });
  }

  editOpportunity(card) {
    let opportunity = card.opportunity;
    this.dialog.open(EditOpportunityComponent, { data: opportunity });
  }

}


