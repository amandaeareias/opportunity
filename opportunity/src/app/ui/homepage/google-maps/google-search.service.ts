import { Injectable } from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import {} from 'googlemaps';

@Injectable({
  providedIn: "root"
})
export class GoogleSearchService {
  constructor(private mapsAPILoader: MapsAPILoader) {}

  loadGooglePlaces(
    input: string
  ): Promise<google.maps.places.QueryAutocompletePrediction[]> {
    return new Promise(async (resolve, reject) => {
      await this.mapsAPILoader.load();
      const suggestionService = new google.maps.places.AutocompleteService();
      suggestionService.getQueryPredictions(
        { input },
        (predictions, status) => {
          resolve(predictions);
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            reject(status);
          }
        }
      );
    });
  }
}
