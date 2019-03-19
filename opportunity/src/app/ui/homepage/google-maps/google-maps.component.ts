import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
  constructor(private router: Router) {}

  ngOnInit() {}

  locateMe() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.router.navigate(['']);
      })
    } else {
      console.log('Geolocation is not supported by this browser')
    }


  }

}
