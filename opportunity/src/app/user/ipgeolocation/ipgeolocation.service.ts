import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IpGeoLocationService {
  private API_KEY = environment.ipgeolocationApiKey;
  
  constructor() {}

  getLocation(): Observable<any> {
    return from(fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${this.API_KEY}`)
      .then(res => res.json()));
  }
}
