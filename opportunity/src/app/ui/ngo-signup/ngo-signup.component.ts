import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store'
import { userDetailsSelector } from '../../user/user.reducers'
import { categoriesList } from '../../data/listsofdata/categorieslist'

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
  ) { }

  categoriesList: string[] = categoriesList
  formData;
  currentUser;

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.store.select(userDetailsSelector)
      .subscribe(user => {
        this.currentUser = user;
        this.createFormData()
      })
  }

  createFormData() {
    this.formData = new FormGroup({
      orgNameForm: new FormControl(this.currentUser.name, [Validators.required, Validators.minLength(2),]),
      categoryForm: new FormControl('', Validators.required),
      descriptionForm: new FormControl('', [Validators.required, Validators.minLength(20)]),
      websiteForm: new FormControl(''),
      addressForm: new FormControl('', [Validators.required]),
      emailForm: new FormControl(this.currentUser.username, [Validators.required, Validators.email]),
      phoneForm: new FormControl(''),
    });
  }

  submitNGO() {
    const { orgNameForm, categoryForm, descriptionForm, websiteForm, addressForm, emailForm, phoneForm } = this.formData.value;
    const data = {
      name: orgNameForm,
      category: categoryForm,
      about: descriptionForm,
      website: websiteForm,
      address: addressForm,
      email: emailForm,
      phone: phoneForm,
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
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }
}
