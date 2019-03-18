import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { LoginService } from '../login.service';
import { MarkAsNgo } from '../../store/store.actions';
import { Observable } from 'rxjs';
import { State } from '../../store/store.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isNgo$: Observable<boolean>;

  constructor(
    private loginService: LoginService,
    private store: Store<State>
  ) {
    this.isNgo$ = store.pipe(select('isNgo'));
    this.store.subscribe(state => console.log(state));
  }

  ngOnInit() {
  }

  loginGoogle(isNgo) {
    this.markAsNgo(isNgo);
    this.loginService.loginWithGoogle();
  }

  markAsNgo(isNgo) {
    this.store.dispatch(new MarkAsNgo(isNgo));
  }

}
