import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddReviewComponent } from './add-review/add-review.component'
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../../navbar/login/login.component'

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.css']
})
export class ReviewStarsComponent implements OnInit {

  @Input()rating: number;
  @Input()new: boolean;
  @Input()profileOwner: boolean;
  @Input()currentUser;

  ratingArr: number[] = [0, 0, 0, 0, 0];
  objStyle = {
    'background-image': 'url(' + '/assets/icons/star-full.png' + ')'
  }

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private LoginComponent: LoginComponent,
  ) { }

  ngOnInit() {
    this.getRating()
  }

  getRating() {
    for (let i = 0; i < this.rating; i++) {
      this.ratingArr[i] = 1
    }
  }

  addReview() {
    console.log(this.currentUser)
    if(this.currentUser) {
      this.dialog.open(AddReviewComponent, {data: this.route.snapshot.paramMap.get('id')})
    } else {
      this.LoginComponent.loginGoogle(false) // call the function again IF LOG-IN SUCCESS so the user can review without clicking again
    }
  }


}
