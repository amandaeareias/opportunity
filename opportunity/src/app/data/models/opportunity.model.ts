import { Application } from './application.model';

export class Opportunity {
  name: string;
  ngo: {
    id: string;
    name: string;
    image: string;
  };
  about: string;
  location: string; // change to geo location
  prerequisites?: string[];
  timeCreated: string;
  active: boolean;
  applicationsCount?: number;

  constructor() {
    this.name = null;
    this.ngo = null;
    this.location = null;
    this.about = null;
    this.prerequisites = [];
    this.active = false;
    this.applicationsCount = 0;
  }
}

export const OpportunityCollection = 'opportunities';
