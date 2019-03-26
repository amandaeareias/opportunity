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
      },
      timeCreated: new Date().toISOString(),
      active: true,
    }
  }

  mapReviewInputToProps({ ngoId, volunteerId, rating, text }) {
    return {
      ngoId,
      volunteerId,
      rating,
      text,
      timeCreated: new Date().toISOString(),
    }
  }

  mapApplicationInputToProps({volunteerId, opportunityId, text}) {
    return {
      volunteerId,
      opportunityId,
      text,
      timeCreated: new Date().toISOString(),
      active: true,
    }
  }
}
