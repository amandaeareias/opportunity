import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { FirebaseCrudService } from 'src/app/data/services/firebase.service';
import { MappingService } from 'src/app/data/services/mapping.service';

import { Volunteer } from 'src/app/data/models/volunteer.model';
import { NGO } from 'src/app/data/models/ngo.model';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  public userId: string = this.dialogData.user.id;
  public userImage: string = this.dialogData.user.image;
  public userName: string = this.dialogData.user.name;
  public ngoId: string = this.dialogData.id;
  public reviewForm: FormGroup = new FormGroup({
    star5: new FormControl(),
    star4: new FormControl(),
    star3: new FormControl(),
    star2: new FormControl(),
    star1: new FormControl(),
    review: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { id: string, user: Volunteer | NGO },
    private dialog: MatDialogRef<AddReviewComponent>,
    private db: FirebaseCrudService,
    private mappingService: MappingService,
  ) { }

  onSubmit() {
    let rating;
    for (let key of Object.keys(this.reviewForm.value)) {
      if (key !== 'review' && this.reviewForm.value[key] !== null) {
        rating = this.reviewForm.value[key];
      }
    }
    const data = this.mappingService
      .mapReviewInputToProps({
        ngoId: this.ngoId,
        volunteerId: this.userId,
        volunteerImage: this.userImage,
        volunteerName: this.userName,
        rating,
        text: this.reviewForm.value.review,
      });
    this.dialog.close();
    try {
      this.db.addReview(data);
    } catch (err) {
      console.error(err);
    }
  }

  cancel() {
    this.dialog.close();
  }

}
