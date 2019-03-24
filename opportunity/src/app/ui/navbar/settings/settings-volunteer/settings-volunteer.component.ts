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
  selector: 'app-settings-volunteer',
  templateUrl: './settings-volunteer.component.html',
  styleUrls: ['./settings-volunteer.component.css']
})
export class SettingsVolunteerComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedImage: string = this.currentUser.user.image

  settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user.name, Validators.required),
    about: new FormControl(this.currentUser.user.about),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public currentUser,
    private fbService: FirebaseCrudService,
    private dialog: MatDialogRef<SettingsVolunteerComponent>,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    console.log(this.currentUser)
  }


  formSubmit() {
    if (this.settingsForm.valid) {
      let newData = {
        name: this.settingsForm.value.name,
        about: this.settingsForm.value.about,
        image: this.selectedImage
      }
      this.fbService.updateVolunteer(this.currentUser.user.id, newData)
        .then(res => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 3000,
          });
          this.dialog.close()
        })
        .catch(e => console.log('Not possible to submit, error: ', e))
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

  deleteProfile() {
    let confirmation = confirm("Are you sure you want to delegite this account?");
    if (confirmation) {
      //implement log-out!!
      this.fbService.deleteVolunteer(this.currentUser.user.id)
    }
  }

}
