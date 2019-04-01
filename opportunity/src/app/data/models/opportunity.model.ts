import { NgoSimplified } from '../interface/ngoSimplified';

export class Opportunity {
  id?: string;
  name: string;
  ngo: NgoSimplified;
  about: string;
  location: string;
  prerequisites?: string[];
  timeCreated: string;
  active: boolean;
}