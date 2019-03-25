import { Application } from './application';
import { Location } from './location';
import { Review } from './review';

export interface Opportunity {
  ageRange: string; // format: 12-80
  category: string;
  description: string;
  engagementType: string; // full-time, part-time, seasonal...
  expires: string;
  featuredImage: string;
  location: Location;
  name: string;
  provider: string; // ID of NGO
  skills: string[];
  rating: number;
  requiresEducation: string;
  requiresExperience: string;
  requiresQualification: string;
  review: Review[];
  timeCreated: string;
  timePublished: string;
  title: string; // Differs from name, means job title e.g. Teacher
  volunteer: Application[];
  workHours: string;
}