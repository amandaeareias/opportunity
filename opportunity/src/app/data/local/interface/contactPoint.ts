import { ContactHours } from './contactHours';
import { Location } from '@angular/common';

export interface ContactPoint {
  availableHours?: ContactHours[];
  availableIn?: string[];
  availableLanguage?: string[];
  description?: string;
  email?: string;
  featuredImage?: string;
  location?: Location;
  telephone?: string[];
  title?: string;
}