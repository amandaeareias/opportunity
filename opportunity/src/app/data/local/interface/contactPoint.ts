import { PostalAddress } from './postalAddress';
import { ContactHours } from './contactHours';

export interface ContactPoint {
  address: PostalAddress;
  availableHours?: ContactHours[];
  availableIn?: string[];
  availableLanguage?: string[];
  description?: string;
  email: string;
  featuredImage?: string;
  telephone: string[];
  title?: string;
}