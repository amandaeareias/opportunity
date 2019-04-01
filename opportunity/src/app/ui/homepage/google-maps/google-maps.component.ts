import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from "rxjs/operators";

import { FirebaseCrudService } from 'src/app/data/services/firebase.service';
import { GoogleSearchService } from "./google-search.service";
import { userLocationSelector } from '../../../user/user.reducers';

import { GeoPin } from 'src/app/data/interface/geoPin';
import { NGO } from 'src/app/data/models/ngo.model';

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.css"]
})
export class GoogleMapsComponent implements OnInit, OnDestroy {
  private agmSearchSubscription: Subscription;
  private userLocationSubscription: Subscription;
  public placeDetail: google.maps.places.PlaceResult;
  public location: GeoPin = { lat: 0, lng: 0 };
  public predictions: Promise<google.maps.places.QueryAutocompletePrediction[]>;
  public searchForm: FormControl = new FormControl("");
  public disableStyles: any[] = [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    }
  ];

  @Input()
  ngos: NGO[];

  constructor(
    private router: Router,
    private searchService: GoogleSearchService,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.agmSearchSubscription = this.searchForm.valueChanges
      .pipe(
        filter(inputValue => inputValue.length > 3),
        debounceTime(300),
        distinctUntilChanged(),
      ).subscribe(value => this.loadGooglePlaces(value));

    this.userLocationSubscription = this.store.select(userLocationSelector)
      .subscribe(location => {
        if (location) {
          this.location = {
            lat: +location.latitude,
            lng: +location.longitude,
          }
        }
      });
  }

  ngOnDestroy() {
    this.agmSearchSubscription.unsubscribe();
    this.userLocationSubscription.unsubscribe();
  }

  locateMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location.lat = position.coords.latitude;
        this.location.lng = position.coords.longitude;
        this.router.navigate(['']);
      });
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
