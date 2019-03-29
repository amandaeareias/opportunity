import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class IpGeoLocationService {
  private API_KEY = '47bb4db9f03d403c829329e9129277cc';

  constructor(
    private http: HttpClient,
  ) {}

  getLocation(): Observable<any> {
    return this.http.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${this.API_KEY}`);
  }
}
