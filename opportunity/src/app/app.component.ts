import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  constructor(
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.auth.authState
      .subscribe((user) => {
        console.log(user);
        this.user = user;
        // console.log(isNgo);
      });
  }
}
