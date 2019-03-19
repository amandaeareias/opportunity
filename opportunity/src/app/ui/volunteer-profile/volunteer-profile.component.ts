import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import {userDetailsSelector} from '../../user/user.reducers'

@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.css']
})
export class VolunteerProfileComponent implements OnInit {

  user;

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.store.select(userDetailsSelector)
      .subscribe(user => {
        console.log('1 ', this.user);
        this.user = user;
        console.log('2 ', this.user);
      })
  }

}
