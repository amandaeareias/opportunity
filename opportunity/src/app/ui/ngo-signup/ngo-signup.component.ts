import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';

import { UserState } from '../../user/user.reducers';
import { CountryListService } from 'src/app/data/services/country-list.service';
import { categoriesList } from '../../data/listsofdata/categorieslist';

@Component({
  selector: 'app-ngo-signup',
  templateUrl: './ngo-signup.component.html',
  styleUrls: ['./ngo-signup.component.css']
})
export class NgoSignupComponent {
  public formData = new FormGroup({
    orgName: new FormControl(this.currentUser.user
      ? this.currentUser.user.name
      : '', [Validators.required, Validators.minLength(2),]),
    category: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(20)]),
    website: new FormControl(''),
    address: new FormGroup({
      country: new FormControl(this.currentUser.location
        ? this.currentUser.location.country_name
        : '', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
    }),
    email: new FormControl(this.currentUser.user
      ? this.currentUser.user.username
      : '', [Validators.required, Validators.email]),
    phone: new FormControl(''),
  });
  public countries = this.countryService.getCountryList();
  public categoriesList: string[] = categoriesList;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentUser: UserState,
    private dialogRef: MatDialogRef<NgoSignupComponent>,
    private snackBar: MatSnackBar,
    private store: Store<any>,
    private countryService: CountryListService,
  ) { }

  submitNGO() {
    const { orgName, category, description, website, address, email, phone } = this.formData.value;
    const data = {
      name: orgName,
      category,
      about: description,
      contact: {
        website,
        address,
        publicEmail: email,
        phone,
      },
    };

    if (this.formData.valid) {
      this.dialogRef.close(data);
      this.snackBar.open('You just joined our opportunities network!', 'close', {
        duration: 3000,
      });
    } else {
      Object.keys(this.formData.controls).forEach(field => {
        const control = this.formData.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }

}
