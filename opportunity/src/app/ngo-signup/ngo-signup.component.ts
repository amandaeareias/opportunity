import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatSnackBar } from '@angular/material';
import { NGO } from './ngo.model';

@Component({
  selector: 'app-ngo-signup',
  templateUrl: './ngo-signup.component.html',
  styleUrls: ['./ngo-signup.component.css']
})
export class NgoSignupComponent implements OnInit {
  constructor() {}

  ngoProfile = new FormGroup({
    usernameForm: new FormControl(''),
    labelsForm: new FormControl(''),
    imageForm: new FormControl(''),
    descriptionForm: new FormControl(''),
    websiteForm: new FormControl(''),
    addressForm: new FormControl(''),
    emailForm: new FormControl(''),
    phoneForm: new FormControl(''),
    jobsForm: new FormControl('')
  });

  ngOnInit() {}

  submitNGO() {
    const newNGO = this.ngoProfile.value;
    const result: NGO = {
      username: newNGO.usernameForm,
      labels: newNGO.labelsForm,
      image: newNGO.imageForm,
      description: newNGO.descriptionForm,
      contacData: {
        website: newNGO.websiteForm,
        address: newNGO.addressForm,
        email: newNGO.emailForm,
        phone: newNGO.phone,
        jobs: newNGO.jobs
      }
    };
  }
}
