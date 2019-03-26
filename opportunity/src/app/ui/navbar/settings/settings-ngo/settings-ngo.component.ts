import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseCrudService } from '../../../../data/services/firebase.service'
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../../snackbar/snackbar.component'
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import { UPDATE_USER_PENDING, USER_LOGOUT_PENDING } from 'src/app/user/user.actions';
import { CountryListService } from 'src/app/data/services/country-list.service';
import { Router } from '@angular/router';
import { GeocodeService } from 'src/app/data/services/google-maps/geocode.service';
import _ from 'lodash';


@Component({
  selector: 'app-settings-ngo',
  templateUrl: './settings-ngo.component.html',
  styleUrls: ['./settings-ngo.component.css']
})
export class SettingsNgoComponent {

  countries = this.countryService.getCountryList();
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  selectedImage: string = this.currentUser.user.image

  settingsForm = new FormGroup({
    name: new FormControl(this.currentUser.user.name, Validators.required),
    about: new FormControl(this.currentUser.user.about, Validators.required),
    address: new FormGroup({
      country: new FormControl(this.currentUser.user.contact.address.country),
      street: new FormControl(this.currentUser.user.contact.address.street),
      city: new FormControl(this.currentUser.user.contact.address.city),
      region: new FormControl(this.currentUser.user.contact.address.region),
      postalCode: new FormControl(this.currentUser.user.contact.address.postalCode),
    }),
    phone: new FormControl(this.currentUser.user.contact.phone, Validators.required),
    website: new FormControl(this.currentUser.user.contact.website),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentUser,
    private store: Store<any>,
    private db: FirebaseCrudService,
    private dialog: MatDialogRef<SettingsNgoComponent>,
    private snackBar: MatSnackBar,
    private countryService: CountryListService,
    private maps: GeocodeService,
    private storage: AngularFireStorage,
    private router: Router,
  ) { }

  ngOnInit() {
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

      if (!_.isEqual(data.contact.address, this.currentUser.user.contact.address)) {
        this.maps.getLocation(data.contact.address)
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
    let confirmation = confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      this.dialog.close();
      this.store.dispatch(new USER_LOGOUT_PENDING());
      this.db.deleteNGO(this.currentUser.user.id);
      this.router.navigate(['']);
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