import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ngo-signup',
  templateUrl: './ngo-signup.component.html',
  styleUrls: ['./ngo-signup.component.css']
})
export class NgoSignupComponent {
  constructor(
    private dialogRef: MatDialogRef<NgoSignupComponent>,
    private snackBar: MatSnackBar,
  ) {}

  private formData = new FormGroup({
    orgNameForm: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    descriptionForm: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    websiteForm: new FormControl(''),
    addressForm: new FormControl('', [Validators.required]),
    emailForm: new FormControl('', [Validators.required, Validators.email]),
    phoneForm: new FormControl(''),
  });

  close() {
    this.dialogRef.close(null);
  }

  submitNGO() {
    const { orgNameForm, descriptionForm, websiteForm, addressForm, emailForm, phoneForm } = this.formData.value;
    const data = {
      name: orgNameForm,
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
    }
  }
}
