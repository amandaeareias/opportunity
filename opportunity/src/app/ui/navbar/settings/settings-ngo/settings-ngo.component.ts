import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseCrudService } from '../../../../data/services/firebase.service'
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../../snackbar/snackbar.component'
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings-ngo',
  templateUrl: './settings-ngo.component.html',
  styleUrls: ['./settings-ngo.component.css']
})
export class SettingsNgoComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedImage: string = this.currentUser.user.image

  settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user.name, Validators.required),
    about: new FormControl(this.currentUser.user.about, Validators.required),
    address: new FormControl(this.currentUser.user.contact.address, Validators.required),
    phone: new FormControl(this.currentUser.user.contact.phone, Validators.required),
    website: new FormControl(this.currentUser.user.contact.website),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public currentUser,
    private fbService: FirebaseCrudService,
    private dialog: MatDialogRef<SettingsNgoComponent>,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
  }

  formSubmit() {
    if (this.settingsForm.valid) {
      let newData = {
        name: this.settingsForm.value.name,
        about: this.settingsForm.value.about,
        contact: {
          address: this.settingsForm.value.address,
          phone: this.settingsForm.value.phone,
          website: this.settingsForm.value.website,
        },
        image: this.selectedImage
      }
      this.fbService.updateNGO(this.currentUser.user.id, newData)
        .then(res => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 3000,
          });
          this.dialog.close()
        })
        .catch(e => console.log('Not possible to submit, error: ', e))
    }
  }

  deleteProfile() {
    let confirmation = confirm("Are you sure you want to delete this account?");
    if (confirmation) {
      //implement log-out!!
      this.fbService.deleteNGO(this.currentUser.user.id)
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = file.name.split('.')[0] + '-' + Date.now() + '.' + file.name.split('.')[1];
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.subscribe(link => {
          this.selectedImage = link
        })
      })
    )
      .subscribe()
  }

  cancel() {
    this.dialog.close()
  }

}