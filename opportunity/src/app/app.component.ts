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

// openFileDialog(file?) {
//   this.fileNameDialogRef = this.dialog.open(FileNameDialogComponent, {
//     data: {
//       filename: file ? file.name : ''
//     }
//   });

//   this.fileNameDialogRef.afterClosed().pipe(
//     filter(name => name)
//   ).subscribe(name => {
//     if (file) {
//       const index = this.files.findIndex(f => f.name == file.name);
//       if (index !== -1) {
//         this.files[index] = { name, content: file.content }
//       }
//     } else {
//       this.files.push({ name, content: ''});
//     }
//   });
// }
// }>
