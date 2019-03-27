import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Volunteer } from 'src/app/data/models/volunteer.model';
import { NGO } from 'src/app/data/models/ngo.model';

import { AddReviewComponent } from './add-review/add-review.component'
import { LoginComponent } from '../../navbar/login/login.component'

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.css']
})
export class ReviewStarsComponent implements OnInit {
  @Input()
  public rating: number;
  @Input()
  public enabled: boolean;
  @Input()
  public isMe: boolean;
  @Input()
  public currentUser: Volunteer | NGO;
  public ratingArr: number[] = [0, 0, 0, 0, 0];
  public objStyle: any = {
    'background-image': 'url(' + '/assets/icons/star-full.png' + ')'
  };
  
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private LoginComponent: LoginComponent,
    ) { }
    
  ngOnInit() {
    this.setRating(this.rating);
  }

  setRating(num = 0) {
    for (let i = 0; i < num; i++) {
      this.ratingArr[i] = 1;
    }
  }

  addReview() {
    if(this.currentUser) {
      this.dialog.open(AddReviewComponent, { data: {
        id: this.route.snapshot.paramMap.get('id'),
        user: this.currentUser,
      } });
    } else {
      this.LoginComponent.loginGoogle(false);
    }
  }

}
