import { Review } from './review.model';
import { ContactPoint } from '../interface/contactPoint';

export class NGO {
  about?: string;
  category?: string;
  contact?: ContactPoint;
  id?: string;
  image?: string;
  isComplete?: boolean;
  location?: any;
  name: string;
  rating?: number;
  reviews?: Review[];
  username: string;
}