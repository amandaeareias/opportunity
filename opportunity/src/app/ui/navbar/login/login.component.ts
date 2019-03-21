import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LoginService } from "../../../user/user-auth/login.service";
import { UpdateLoadingState, UpdateUIState } from "../../ui.actions";
import { UIState } from "../../ui.reducers";
import {
  UserState,
  isUserCompleteSelector,
  getUserState
} from "src/app/user/user.reducers";
import { NGO } from "src/app/data/models/ngo.model";
import { Volunteer } from "src/app/data/models/volunteer.model";
import { NgoSignupComponent } from "../../ngo-signup/ngo-signup.component";
import { VolunteerSignupComponent } from "../../volunteer-signup/volunteer-signup.component";
import {
  UserRegistrationSuccessful,
  UserRegistrationFailed
} from "src/app/user/user.actions";
import { Observable } from "rxjs";
// import { Register } from "src/app/user/user.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  // TO DO: export from the user type interface a subtype of NGO | Volunteer
  user: Volunteer | NGO;
   counter = 0;

  constructor(
    private store: Store<UIState>,
    private userStore: Store<UserState>,
    private auth: LoginService,
    public dialog: MatDialog
  ) {}

  loginGoogle(isNgo: boolean) {
    this.store.dispatch(
      new UpdateLoadingState({
        component: "navbar",
        loadingState: true
      })
    );
    this.store.dispatch(
      new UpdateUIState({
        component: "navbar",
        uiState: isNgo ? "NGO_SIGNIN" : "VOL_SIGNIN"
      })
    );
    this.auth.loginWithGoogle();
    this.userStore.select(getUserState).subscribe(user => {
      if (!user.isComplete) {
        if (user.isNgo) {
          this.signUpUser(NgoSignupComponent);
        } else if (user.isNgo === false) {
          this.signUpUser(VolunteerSignupComponent);
        }
      }
    });
  }

  signUpUser(userComponentName) {
    this.dialog
      .open(userComponentName)
      .afterClosed()
      .subscribe((registrationSuccesful: boolean) => {
        if (registrationSuccesful) {
          this.store.dispatch(new UserRegistrationSuccessful());
        } else {
          // TO DO: find a more beautiful way to solve the circular if when the dialog is closed
          if (this.counter = 0) {
            this.counter = this.counter + 1;
            this.store.dispatch(new UserRegistrationFailed());
          }
        }
      });
  }
}
