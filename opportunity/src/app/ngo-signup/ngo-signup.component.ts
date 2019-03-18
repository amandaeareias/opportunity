import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NGO } from '../models/ngo.model';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material';

@Component({
  selector: 'app-ngo-signup',
  templateUrl: './ngo-signup.component.html',
  styleUrls: ['./ngo-signup.component.css']
})
export class NgoSignupComponent implements OnInit {
  isValid = true;
  constructor(
    private dialogRef: MatDialogRef<NgoSignupComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngoProfile = new FormGroup({
    orgNameForm: new FormControl('', [Validators.required, Validators.minLength(2)]),
    descriptionForm: new FormControl('', [Validators.required, Validators.minLength(100)]),
    websiteForm: new FormControl('', [Validators.required]),
    addressForm: new FormControl('', [Validators.required]),
    emailForm: new FormControl('', [Validators.required, Validators.email]),
    phoneForm: new FormControl('', [Validators.required])
  });

  ngOnInit() {}

  get fields() { return this.ngoProfile.controls; }

  validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}

  submitNGO() {
    const newNGO = this.ngoProfile.value;
    const result: any = {
      name: newNGO.orgNameForm,
      about: newNGO.descriptionForm,
      contacData: {
        website: newNGO.websiteForm,
        address: newNGO.addressForm,
        publicEmail: newNGO.emailForm,
        phone: newNGO.phone
      }
    };
    console.log(this.ngoProfile);
    if (this.ngoProfile.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(this.ngoProfile);
      this.isValid = false;
    }
    // this.dialogRef.close(`${this.ngoProfile.value}`);
  }
}
