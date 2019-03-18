import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { MatSnackBar } from "@angular/material";
import { NGO } from "../models/ngo.model";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogRef
} from "@angular/material";

@Component({
  selector: "app-ngo-signup",
  templateUrl: "./ngo-signup.component.html",
  styleUrls: ["./ngo-signup.component.css"]
})
export class NgoSignupComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<NgoSignupComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngoProfile = new FormGroup({
    usernameForm: new FormControl(""),
    imageForm: new FormControl(""),
    descriptionForm: new FormControl(""),
    websiteForm: new FormControl(""),
    addressForm: new FormControl(""),
    emailForm: new FormControl(""),
    phoneForm: new FormControl("")
  });

  ngOnInit() {}

  submitNGO() {
    const newNGO = this.ngoProfile.value;
    const result: any = {
      username: newNGO.usernameForm,
      image: newNGO.imageForm,
      description: newNGO.descriptionForm,
      contacData: {
        website: newNGO.websiteForm,
        address: newNGO.addressForm,
        email: newNGO.emailForm,
        phone: newNGO.phone
      }
    };
    // this.dialogRef.close(`${this.ngoProfile.value}`);
  }
}
