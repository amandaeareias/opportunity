import { Opportunity } from './opportunity.model';

export class NGO {
  name: string;
  username: string;
  image?: string;
  about?: string;
  rating?: number;
  contact?: {
    website?: string;
    address: string;
    publicEmail: string;
    phone: string;
  };
  opportunity?: Object;
  isComplete?: boolean;

  constructor() {
    this.name = null;
    this.username = null;
    this.image = null;
    this.about = null;
    this.rating = null;
    this.contact = {
      website: null,
      address: null,
      publicEmail: null,
      phone: null,
    };
    this.opportunity = {};
    this.isComplete = false;
  }
}

export const NgoCollection = 'ngos';
export type UserRecord = Pick<NGO, 'name' |'about' |'contact'>
