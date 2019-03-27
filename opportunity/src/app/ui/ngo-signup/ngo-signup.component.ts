import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store'
import { getUserState, UserState } from '../../user/user.reducers'
import { CountryListService } from 'src/app/data/services/country-list.service';
import { categoriesList } from '../../data/listsofdata/categorieslist'

@Component({
  selector: 'app-ngo-signup',
  templateUrl: './ngo-signup.component.html',
  styleUrls: ['./ngo-signup.component.css']
})
export class NgoSignupComponent implements OnInit {
  public currentUser: UserState;
  public formData;
  public countries = this.countryService.getCountryList();
  categoriesList: string[] = categoriesList

  constructor(
    private dialogRef: MatDialogRef<NgoSignupComponent>,
    private snackBar: MatSnackBar,
    private store: Store<any>,
    private countryService: CountryListService,
  ) { }

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
      categoryForm: new FormControl('', Validators.required),
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
    const { orgNameForm, categoryForm, descriptionForm, websiteForm, address, emailForm, phoneForm } = this.formData.value;
    const data = {
      name: orgNameForm,
      category: categoryForm,
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
    } else {
      Object.keys(this.formData.controls).forEach(field => {
        const control = this.formData.get(field);
        if (control instanceof FormControl) {
          console.log(control)
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }
}
