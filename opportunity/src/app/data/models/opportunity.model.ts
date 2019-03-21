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
  application?: string[]; //array of ids for reference
}

export const OpportunityCollection = 'opportunities';
