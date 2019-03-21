import { Application } from './application.model';

export class Volunteer {
  username: string; // email
  name: string;
  about?: string;
  image?: string;
  dateOfBirth?: string;
  application?: Application[];
}

export const VolunteerCollection = 'volunteers';
