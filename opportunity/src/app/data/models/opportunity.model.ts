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
  application?: Application[];
}

export const OpportunityCollection = 'opportunities';
