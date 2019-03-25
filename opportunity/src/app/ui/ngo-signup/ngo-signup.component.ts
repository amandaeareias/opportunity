import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store'
import { getUserState, UserState } from '../../user/user.reducers'
import { CountryListService } from 'src/app/data/services/country-list.service';

@Component({
  selector: 'app-ngo-signup',
  templateUrl: './ngo-signup.component.html',
  styleUrls: ['./ngo-signup.component.css']
})
export class NgoSignupComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<NgoSignupComponent>,
    private snackBar: MatSnackBar,
    private store: Store<any>,
    private countryService: CountryListService,
  ) { }

  public currentUser: UserState;
  public formData; 
  countries = this.countryService.getCountryList();

  ngOnInit() {
    this.store.select(getUserState)
      .subscribe(user => {
        this.currentUser = user;
        this.generateFormData(user);
      });
  }

  generateFormData(user) {
    const countryName = user.location.country_name || '';
    const name = user.user.name || '';
    const email = user.user.username || '';

    this.formData = new FormGroup({
      orgNameForm: new FormControl(name, [Validators.required, Validators.minLength(2),]),
      descriptionForm: new FormControl('', [Validators.required, Validators.minLength(20)]),
      websiteForm: new FormControl(''),
      address: new FormGroup({
        country: new FormControl(countryName, [Validators.required]),
        street: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        region: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [Validators.required]),
      }),
      emailForm: new FormControl(email, [Validators.required, Validators.email]),
      phoneForm: new FormControl(''),
    });
  }

  submitNGO() {
    const { orgNameForm, descriptionForm, websiteForm, address, emailForm, phoneForm } = this.formData.value;
    const data = {
      name: orgNameForm,
      about: descriptionForm,
      contact: {
        website: websiteForm,
        address,
        publicEmail: emailForm,
        phone: phoneForm,
      }
    };

    if (this.formData.valid) {
      this.dialogRef.close(data);
      this.snackBar.open('You just joined our opprtunities network!', 'close', {
        duration: 3000,
      });
    }
  }
}
