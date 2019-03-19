import { NGO } from './ngo.model';

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
  application?: Object;
}

export const OpportunityCollection = 'opportunities';
