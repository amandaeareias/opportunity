import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FirebaseCrudService } from '../../../../data/services/firebase.service'
import { MappingService } from '../../../../data/services/mapping.service'
import { Store } from '@ngrx/store'
import { userDetailsSelector } from '../../../../user/user.reducers'


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  reviewForm = new FormGroup({
    star5: new FormControl(),
    star4: new FormControl(),
    star3: new FormControl(),
    star2: new FormControl(),
    star1: new FormControl(),
    review: new FormControl(),
  });

  userId;

  constructor(
    private dialog: MatDialogRef<AddReviewComponent>,
    private fbService: FirebaseCrudService,
    private mappingService: MappingService,
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public ngoId,
  ) { }

  ngOnInit() {
    this.getUserInfo()
  }

  getUserInfo() {
    this.store.select(userDetailsSelector)
    .subscribe(user => {
      this.userId = user.id
    })
  }

  formSubmit() {
    let rating;
    for(let key of Object.keys(this.reviewForm.value)){
      if(key!=='review' && this.reviewForm.value[key] !== null)
      rating = this.reviewForm.value[key]
    }
    console.log(this.ngoId, this.userId, rating, this.reviewForm.value.review)
    // const review = this.mappingService.mapReviewInputToProps({this.ngoId, this.userId, rating, this.reviewForm.value.review})
    // this.fbService.createReview(review)
    this.dialog.close()
  }

  cancel() {
    this.dialog.close()
  }

}
