import { NGO } from './ngo.model';

export class Opportunity {
  about: string;
  id?: string;
  name: string;
  ngo: NGO;
  location: string; // change to geo location
  prerequisites?: string[];
  timeCreated: string;

  constructor() {
    this.about = null;
    this.name = null;
    this.ngo = null;
    this.location = null;
    this.about = null;
    this.prerequisites = [];
  }
}

export const OpportunityCollection = 'opportunities';
