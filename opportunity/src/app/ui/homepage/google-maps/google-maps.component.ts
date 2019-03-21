import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleSearchService } from "./google-search.service";
import { FormControl } from "@angular/forms";
import { filter, debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.css"]
})
export class GoogleMapsComponent implements OnInit {

  placeDetail: google.maps.places.PlaceResult;
  location = { lat: 41.386399, lng: 2.144758 };
  predictions: Promise<google.maps.places.QueryAutocompletePrediction[]>;
  searchForm = new FormControl("");
  disableStyles = [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    }
  ];
  constructor(
    private router: Router,
    private searchService: GoogleSearchService
  ) {}

  ngOnInit() {
    this.searchForm.valueChanges
      .pipe(
        filter(inputValue => inputValue.length > 3),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => this.loadGooglePlaces(value));
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
}
