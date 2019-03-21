import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseCrudService } from '../../../../data/services/firebase.service'

@Component({
  selector: 'app-settings-ngo',
  templateUrl: './settings-ngo.component.html',
  styleUrls: ['./settings-ngo.component.css']
})
export class SettingsNgoComponent implements OnInit {

  settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user.name),
    about: new FormControl(this.currentUser.user.about),
    address: new FormControl(this.currentUser.user.contact.address),
    phone: new FormControl(this.currentUser.user.contact.phone),
    website: new FormControl(this.currentUser.user.contact.website),
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
      this.fbService.deleteNGO(this.currentUser.user.id)
    }
  }

}