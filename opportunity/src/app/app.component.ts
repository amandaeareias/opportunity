import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NgoSignupComponent } from "./ngo-signup/ngo-signup.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  fileNameDialogRef: MatDialogRef<NgoSignupComponent>;
  private files = [
    { name: "foo.js", content: "" },
    { name: "bar.js", content: "" }
  ];

  constructor(public dialog: MatDialog) {}

  // TODO: remove this code. Is for testing purpose only
  // this step will be included after the validation check for new users
  openDialog(registrationData) {
    this.dialog.open(NgoSignupComponent, {
      data: {
        filename: registrationData ? registrationData.name : ""
      }
    });
  }

}

