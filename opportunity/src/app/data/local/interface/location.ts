import { PostalAddress } from './postalAddress';
import { GeoPin } from './geoPin';

export interface Location {
  address?: PostalAddress;
  geoPin?: GeoPin;
  featuredPhoto?: string;
  formattedAddress?: string;
  placeId?: string;
  plusCode?: {
    compound_code?: string;
    global_code?: string;
  };
  title?: string;
  description?: string;
}