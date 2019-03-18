import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
var firebase = require('firebase');

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any
  constructor(
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.auth.authState
      .subscribe((user) => {
        console.log(user);
        this.user = user;
      });
  }

}
