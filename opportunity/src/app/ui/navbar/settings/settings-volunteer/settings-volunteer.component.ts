import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { SnackbarComponent } from '../../../snackbar/snackbar.component'
import { UPDATE_USER_PENDING, DELETE_USER_LOGOUT } from 'src/app/user/user.actions';
import { FirebaseCrudService } from 'src/app/data/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-volunteer',
  templateUrl: './settings-volunteer.component.html',
  styleUrls: ['./settings-volunteer.component.css']
})
export class SettingsVolunteerComponent {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedImage: string = this.currentUser.user.image

  settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user.name, Validators.required),
    about: new FormControl(this.currentUser.user.about),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentUser,
    private store: Store<any>,
    private dialog: MatDialogRef<SettingsVolunteerComponent>,
    private db: FirebaseCrudService,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
    private router: Router,
  ) {}


  formSubmit() {
    if (this.settingsForm.valid) {
      this.store.dispatch(new UPDATE_USER_PENDING({
        id: this.currentUser.user.id,
        isNgo: this.currentUser.isNgo,
        data: { ...this.settingsForm.value, image: this.selectedImage },
      }));
      this.dialog.close();
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
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
    let confirmation = confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      this.dialog.close();
      this.store.dispatch(new DELETE_USER_LOGOUT({
        id: this.currentUser.user.id,
        isNgo: this.currentUser.isNgo,
      }));
      this.router.navigate(['']);
    }
  }

}
