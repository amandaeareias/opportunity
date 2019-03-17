import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Store } from "@ngrx/store";
import { UserState, userSelector } from "../store/user.reducers";
import { UpdateUserDetails, Logout } from "../store/user.actions";
import { Observable } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  userDetails$: Observable<any>;
  constructor(private store: Store<UserState>, private auth: AngularFireAuth) {}

  ngOnInit() {
    this.userDetails$ = this.store.select(userSelector);
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.store.dispatch(new Logout());
      } else {
        console.log("dispatch UpdateUserDetails");
        const { displayName, email, photoURL } = user;
        this.store.dispatch(
          new UpdateUserDetails({ displayName, email, photoURL })
        );
      }
    });
  }
}
