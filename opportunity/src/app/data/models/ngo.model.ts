import { Opportunity } from './opportunity.model';

export class NGO {
  id?: string;
  name: string;
  username: string;
  image?: string;
  about: string;
  rating?: number;
  contact: {
    website?: string;
    address: string;
    publicEmail: string;
    phone: string;
  };
  opportunity?: Object;
}

export const NgoCollection = 'ngos';
