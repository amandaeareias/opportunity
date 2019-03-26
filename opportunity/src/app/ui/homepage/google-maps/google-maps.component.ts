import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleSearchService } from "./google-search.service";
import { FormControl } from "@angular/forms";
import { filter, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { userLocationSelector } from '../../../user/user.reducers';
import { FirebaseCrudService } from 'src/app/data/services/firebase.service';

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.css"]
})
export class GoogleMapsComponent implements OnInit {

  placeDetail: google.maps.places.PlaceResult;
  location = { lat: 0, lng: 0 };
  predictions: Promise<google.maps.places.QueryAutocompletePrediction[]>;
  searchForm = new FormControl("");
  disableStyles = [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    }
  ];
  ngos = [];

  constructor(
    private router: Router,
    private searchService: GoogleSearchService,
    private store: Store<any>,
    private db: FirebaseCrudService,
  ) {}

  ngOnInit() {
    this.searchForm.valueChanges
      .pipe(
        filter(inputValue => inputValue.length > 3),
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(value => this.loadGooglePlaces(value));
    
    this.db.getMany('ngos')
      .subscribe(res => {
        this.ngos = res;
      });
    
    this.store.select(userLocationSelector)
      .subscribe(location => {
        if (location) {
          this.location = {
            lat: +location.latitude,
            lng: +location.longitude,
          }
        }
      });
  }

  locateMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location.lat = position.coords.latitude;
        this.location.lng = position.coords.longitude;
        this.router.navigate([""]);
      });
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }

  loadGooglePlaces(input: string) {
    this.predictions = this.searchService.loadGooglePlaces(input);
  }


  retrieveCoord(placeId) {
    this.searchService.searchByAPlaceId(placeId).then(placeResult => {
      this.location = {
        lat: placeResult.geometry.location.lat(),
        lng: placeResult.geometry.location.lng()
      };
    });
  }

  showMarkerDetails(id) {
    this.router.navigate([`/ngo/${id}`]);
  }
}
