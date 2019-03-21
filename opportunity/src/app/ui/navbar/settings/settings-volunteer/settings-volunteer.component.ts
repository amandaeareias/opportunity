import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import {FormControl, FormGroup} from '@angular/forms';
import { FirebaseCrudService } from '../../../../data/services/firebase.service'

@Component({
  selector: 'app-settings-volunteer',
  templateUrl: './settings-volunteer.component.html',
  styleUrls: ['./settings-volunteer.component.css']
})
export class SettingsVolunteerComponent implements OnInit {

  settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user.name),
    about: new FormControl(this.currentUser.user.about),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public currentUser,
    private fbService: FirebaseCrudService,
  ) { }

  ngOnInit() {
    console.log(this.currentUser)
  }

  formSubmit() {
    console.log(this.settingsForm.value)
  }

  deleteProfile() {
    let confirmation = confirm("Are you sure you want to delete this account?");
    if (confirmation) {
      //implement log-out!!
      this.fbService.deleteVolunteer(this.currentUser.user.id)
    }
  }

}
