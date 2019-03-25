import { ContactPoint } from './contactPoint';
import { Location } from './location';
import { Review } from './review';

export interface Organization {
  category: string;
  contact: ContactPoint[];
  description: string;
  event: string[]; // IDs
  featuredImage: string;
  legalName: string;
  logo: string;
  name: string;
  primaryLocation: Location;
  rating: number;
  review: Review[];
  timeCreated: string;
  timePublished: string;
}