import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { LoginService } from "../login.service";
import { MarkAsNgo, GoogleLogin } from "../../store/user.actions";
import { Observable } from "rxjs";
import { UserState, isNgoSelector } from "../../store/user.reducers";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isNgo$: Observable<boolean>;

  constructor(
    private loginService: LoginService,
    private store: Store<UserState>
  ) {
    this.isNgo$ = store.select(isNgoSelector);
  }

  ngOnInit() {}

  loginGoogle(isNgo: boolean) {
    this.store.dispatch(new GoogleLogin(isNgo));
  }
}
