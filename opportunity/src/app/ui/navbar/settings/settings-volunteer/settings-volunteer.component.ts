import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UserState } from 'src/app/user/user.reducers';
import { UPDATE_USER_PENDING, DELETE_USER_LOGOUT } from 'src/app/user/user.actions';

import { SnackbarComponent } from '../../../snackbar/snackbar.component';

@Component({
  selector: 'app-settings-volunteer',
  templateUrl: './settings-volunteer.component.html',
  styleUrls: ['./settings-volunteer.component.css']
})
export class SettingsVolunteerComponent implements OnDestroy {
  private storageChangesSubscription: Subscription;
  private storageFinalizeSubscription: Subscription;
  public uploadPercent: Observable<number>;
  public downloadURL: Observable<string>;
  public selectedImage: string = this.currentUser.user.image;
  public fileTooBig: boolean = false;
  public wrongFormat: boolean = false;
  public settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user ? this.currentUser.user.name : '', Validators.required),
    about: new FormControl(this.currentUser.user ? this.currentUser.user.about : ''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentUser: UserState,
    private store: Store<any>,
    private dialog: MatDialogRef<SettingsVolunteerComponent>,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
    private router: Router,
  ) { }

  ngOnDestroy() {
    this.storageChangesSubscription && this.storageChangesSubscription.unsubscribe();
    this.storageFinalizeSubscription && this.storageFinalizeSubscription.unsubscribe();
  }

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
    if (!['png', 'jpeg', 'jpg'].includes(file.type.split('/')[1])) {
      this.wrongFormat = true
    } else if (file.size > 10000000) {
      this.wrongFormat = false
      this.fileTooBig = true
    } else {
      this.fileTooBig = false
      this.wrongFormat = false
      const filePath = file.name.split('.')[0] + '-' + Date.now() + '.' + file.name.split('.')[1];
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      /* observe percentage changes */
      this.uploadPercent = task.percentageChanges();
      /* get notified when the download URL is available */
      this.storageChangesSubscription = task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.storageFinalizeSubscription = this.downloadURL.subscribe(link => {
            this.selectedImage = link;
          });
        }),
      ).subscribe();
    }
  }

  cancel() {
    this.dialog.close();
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
