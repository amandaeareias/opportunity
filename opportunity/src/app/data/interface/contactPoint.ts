import { ContactHours } from './contactHours';
import { PostalAddress } from './postalAddress';

export interface ContactPoint {
  address: PostalAddress;
  availableHours?: ContactHours[];
  availableIn?: string[];
  availableLanguage?: string[];
  description?: string;
  publicEmail: string;
  featuredImage?: string;
  phone?: string;
  title?: string;
  website?: string;
}