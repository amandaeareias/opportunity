import { Injectable } from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import {} from "googlemaps";

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

  searchByAPlaceId(placeId: string): Promise<google.maps.places.PlaceResult> {
    this.mapsAPILoader.load();
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    return new Promise((resolve, reject) => {
      service.getDetails(
        {
          placeId,
          fields: [
            "name",
            "formatted_address",
            "place_id",
            "geometry",
            "photos"
          ]
        },
        (
          result: google.maps.places.PlaceResult,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(result);
          }
          reject(status);
        }
      );
    });
  }
}
