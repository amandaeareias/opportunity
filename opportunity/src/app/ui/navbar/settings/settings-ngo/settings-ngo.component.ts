import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
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
    private dialog: MatDialogRef<SettingsNgoComponent>,
  ) { }

  ngOnInit() {
    console.log(this.currentUser)
  }

  formSubmit() {
    let newData = {
      name: this.settingsForm.value.name,
      about: this.settingsForm.value.about,
      contact: {
        address: this.settingsForm.value.address,
        phone: this.settingsForm.value.phone,
        website: this.settingsForm.value.website,
      }
    }
    this.fbService.updateNGO(this.currentUser.user.id, newData)
      .then(res => {
        console.log('Changes updated')
        this.dialog.close()
      })
      .catch(e => console.log('Not possible to submit, error: ', e))
  }

  deleteProfile() {
    let confirmation = confirm("Are you sure you want to delete this account?");
    if (confirmation) {
      //implement log-out!!
      this.fbService.deleteNGO(this.currentUser.user.id)
    }
  }

}