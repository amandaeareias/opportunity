import { NGO } from "./ngo.model";

export class Opportunity {
  id?: string;
  name: string;
  ngo: {
    id: string;
    name: string;
    image: string;
  };
  about: string;
  location: string; // change to geo location
  prerequisites: string[];
  timeCreated: string;
  active: boolean;
  application?: {
    volunteerId?: string;
    volunteerName: string;
    dateCreated: string;
  }[];
}

export const OpportunityCollection = "opportunity";
