import { Opportunity } from './opportunity.model';

// use interface instead of class as interfaces are interpreted in compile time
// and don't use memory in runtime
export interface NGO {
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
export type UserRecord = Pick<NGO, 'name' |'about' |'contact'>
