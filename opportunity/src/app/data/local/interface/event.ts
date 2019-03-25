import { Application } from './application';
import { Location } from './location';
import { Review } from './review';

export interface Event {
  ageRange: string; // format: 12-80
  attendeeNumberGoal: number;
  category: string;
  dateEnds: string;
  dateStarts: string;
  description: string;
  featuredImage: string;
  location: Location;
  name: string;
  organizer: string; // ID
  skills: string[]; // instead of prerequisites
  rating: number;
  requiresEducation: string;
  requiresExperience: string;
  requiresQualification: string;
  review: Review[];
  timeCreated: string;
  timeEnds: string;
  timePublished: string;
  timeStarts: string;
  volunteer: Application[];
}