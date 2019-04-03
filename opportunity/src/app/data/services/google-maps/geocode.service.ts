import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private GOOGLE_MAPS_API_HOST = 'https://maps.googleapis.com/maps/api/geocode';
  private GOOGLE_MAPS_API_KEY = environment.googleMapsApiKey;

  constructor(
    private http: HttpClient,
  ) { }

  getLocation(addressObject) {
    const query = this.formatAddress(addressObject).query;
    return this.http
      .get<any>(`${this.GOOGLE_MAPS_API_HOST}/json?address=${query}&key=${this.GOOGLE_MAPS_API_KEY}`)
      .pipe(
        map(({ results, status }) => {
          if (status === 'OK') {
            return {
              formattedAddress: results[0].formatted_address,
              geoPin: results[0].geometry.location,
              placeId: results[0].place_id,
              // plusCode: results[0].plus_code,
            };
          }
        }),
      );
  }

  formatAddress(addressObject) {
    const { street, city, region, postalCode, country } = addressObject;
    return {
      inline: `${street}, ${city}, ${region} ${postalCode}, ${country}`,
      query: `${street},+${city},+${region}+${postalCode},+${country}`,
    };
  }
}
