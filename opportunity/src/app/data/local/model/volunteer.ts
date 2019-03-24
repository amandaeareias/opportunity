import { ContactPoint } from './contactPoint';
import { Review } from './review';

export class Volunteer {
  contact: ContactPoint;
  dateOfBirth: string;
  description: string;
  event: string[]; // IDs
  featuredImage: string;
  name: string;
  opportunity: string[]; // IDs
  review: Review[];
  timeCreated: string;
  user: string; // ID
}