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
  application?: Application[]; //Ekaterina: not sure if we need it here
}

export const OpportunityCollection = 'opportunities';
