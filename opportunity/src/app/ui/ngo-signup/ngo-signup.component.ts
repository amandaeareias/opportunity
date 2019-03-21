import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NGO } from '../../data/models/ngo.model';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import { FirebaseCrudService } from 'src/app/data/services/firebase.service';
import { Store } from '@ngrx/store';
import { UserState, getUserState } from 'src/app/user/user.reducers';

@Component({
  selector: 'app-ngo-signup',
  templateUrl: './ngo-signup.component.html',
  styleUrls: ['./ngo-signup.component.css']
})
export class NgoSignupComponent implements OnInit {
  userData: NGO;

  constructor(
    private dialogRef: MatDialogRef<NgoSignupComponent>,
    private snackBar: MatSnackBar,
    private db: FirebaseCrudService,
    private userStore: Store<UserState>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngoProfile = new FormGroup({
    orgNameForm: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    descriptionForm: new FormControl('', [
      Validators.required,
      Validators.minLength(20)
    ]),
    websiteForm: new FormControl(''),
    addressForm: new FormControl('', [Validators.required]),
    emailForm: new FormControl('', [Validators.required, Validators.email]),
    phoneForm: new FormControl('', [Validators.required])
  });

  ngOnInit() {}

  close(): void {
    this.dialogRef.close(false);
  }

  async submitNGO() {
    const newNGO = this.ngoProfile.value;
    const result: any = {
      name: newNGO.orgNameForm,
      about: newNGO.descriptionForm,
      contact: {
        website: newNGO.websiteForm,
        address: newNGO.addressForm,
        publicEmail: newNGO.emailForm,
        phone: newNGO.phoneForm
      }
    };
    this.userStore.select(getUserState).subscribe(data => {
      const googleAuthData = data.user;
      this.userData = { ...googleAuthData, ...result };
    });

    if (this.ngoProfile.valid) {
      await this.db.createNGO(this.userData);
      this.dialogRef.close(true);
      this.snackBar.open('You just joined our opprtunities network!', 'close', {
        duration: 4000
      });
    } else {
      console.log('form invalid');
    }
  }
}
