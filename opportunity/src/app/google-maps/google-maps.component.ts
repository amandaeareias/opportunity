import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  lat = 41.3851;
  lng = 2.1734;
  disableStyles = [
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]
    }
  ];
  constructor() {}

  ngOnInit() {}
}
