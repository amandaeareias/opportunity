import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor() { }

  mapVolunteerInputToProps(id, { name, about, dateOfBirth }) {
    return [
      id,
      {
        name,
        about,
        dateOfBirth,
      }
    ];
  }

  mapNgoInputToProps(id, { name, about, website, address, email, phone }) {
    return [
      id,
      {
        name,
        about,
        contact: {
          website,
          address,
          publicEmail: email,
          phone,
        }
      }
    ];
  }

  /* mapOpportunityInputToProps is ONLY used for creating Opportunity record */
  /* USE updateOpportunity from firebase.service directly for updating Opportunity */
  mapOpportunityInputToProps(ngoData, { name, about, location, prerequisites }) {
    return {
      name,
      about,
      location,
      prerequisites,
      ngo: {
        id: ngoData.id,
        name: ngoData.name,
        image: ngoData.image,
        category: ngoData.category,
      },
      timeCreated: new Date().toISOString(),
      active: true,
    }
  }

  mapReviewInputToProps(data) {
    return {
      ...data,
      rating: +data.rating,
      timeCreated: new Date().toISOString(),
    }
  }

  mapApplicationInputToProps(data) {
    return {
      ...data,
      timeCreated: new Date().toISOString(),
      active: true,
    }
  }
}
