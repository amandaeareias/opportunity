import { Component, Inject, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { isEqual } from 'lodash';

import { CountryListService } from 'src/app/data/services/country-list.service';
import { GeocodeService } from 'src/app/data/services/google-maps/geocode.service';
import { UPDATE_USER_PENDING, DELETE_USER_LOGOUT } from 'src/app/user/user.actions';

import { SnackbarComponent } from '../../../snackbar/snackbar.component';

@Component({
  selector: 'app-settings-ngo',
  templateUrl: './settings-ngo.component.html',
  styleUrls: ['./settings-ngo.component.css']
})
export class SettingsNgoComponent implements OnDestroy {
  private ipLocationSubscription: Subscription;
  private storageChangesSubscription: Subscription;
  private storageFinalizeSubscription: Subscription;
  public countries: string[] = this.countryService.getCountryList();
  public uploadPercent: Observable<number>;
  public downloadURL: Observable<string>;
  public selectedImage: string = this.currentUser.user.image;
  public fileTooBig: boolean = false;
  public wrongFormat: boolean = false;
  public settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user
      ? this.currentUser.user.name
      : '', Validators.required),
    about: new FormControl(this.currentUser.user
      ? this.currentUser.user.about
      : '', Validators.required),
    address: new FormGroup({
      country: new FormControl(this.currentUser.user.contact.address
        ? this.currentUser.user.contact.address.country
        : ''),
      street: new FormControl(this.currentUser.user.contact.address
        ? this.currentUser.user.contact.address.street
        : ''),
      city: new FormControl(this.currentUser.user.contact.address
        ? this.currentUser.user.contact.address.city
        : ''),
      region: new FormControl(this.currentUser.user.contact.address
        ? this.currentUser.user.contact.address.region
        : ''),
      postalCode: new FormControl(this.currentUser.user.contact.address
        ? this.currentUser.user.contact.address.postalCode
        : ''),
    }),
    phone: new FormControl(this.currentUser.user.contact
      ? this.currentUser.user.contact.phone
      : ''),
    website: new FormControl(this.currentUser.user.contact
      ? this.currentUser.user.contact.website
      : ''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentUser,
    private store: Store<any>,
    private dialog: MatDialogRef<SettingsNgoComponent>,
    private snackBar: MatSnackBar,
    private countryService: CountryListService,
    private maps: GeocodeService,
    private storage: AngularFireStorage,
    private router: Router,
  ) { }

  ngOnDestroy() {
    this.ipLocationSubscription && this.ipLocationSubscription.unsubscribe();
    this.storageChangesSubscription && this.storageChangesSubscription.unsubscribe();
    this.storageFinalizeSubscription && this.storageFinalizeSubscription.unsubscribe();
  }

  formSubmit() {
    if (this.settingsForm.valid) {

      const data = {
        name: this.settingsForm.value.name,
        about: this.settingsForm.value.about,
        contact: {
          address: this.settingsForm.value.address,
          phone: this.settingsForm.value.phone,
          website: this.settingsForm.value.website,
        }
      };

      if (!isEqual(data.contact.address, this.currentUser.user.contact.address)) {
        this.ipLocationSubscription = this.maps.getLocation(data.contact.address)
          .subscribe(res => {
            this.updateProfile(
              this.currentUser.user.id,
              this.currentUser.isNgo,
              { ...data, location: res, image: this.selectedImage }
            );
          });
      } else {
        this.updateProfile(
          this.currentUser.user.id,
          this.currentUser.isNgo,
          { ...data, image: this.selectedImage }
        );
      }
      this.dialog.close();
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
    }
  }

  updateProfile(id, isNgo, data) {
    this.store.dispatch(new UPDATE_USER_PENDING({
      id,
      isNgo,
      data,
    }));
  }

  deleteProfile() {
    const confirmation = confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      this.dialog.close();
      this.store.dispatch(new DELETE_USER_LOGOUT({
        id: this.currentUser.user.id,
        isNgo: this.currentUser.isNgo,
      }));
      this.router.navigate(['']);
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
      /* Observe percentage changes */
      this.uploadPercent = task.percentageChanges();
      /* Get notified when the download URL is available */
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

}