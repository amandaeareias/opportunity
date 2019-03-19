import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html",
  styleUrls: ["./google-maps.component.css"]
})
export class GoogleMapsComponent implements OnInit {
  lat: number = 41.3851;
  lng: number = 2.1734;
  constructor() {}

  ngOnInit() {}
}
