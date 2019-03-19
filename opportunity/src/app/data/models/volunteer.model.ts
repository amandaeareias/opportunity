import { Application } from './application.model';

export class Volunteer {
  username: string; // email
  name: string;
  about?: string;
  image?: string;
  dateOfBirth?: string;
  application?: Application[];
  isComplete?: boolean;
  
  constructor() {
    this.name = null;
    this.username = null;
    this.image = null;
    this.about = null;
    this.application = [];
    this.isComplete = false;
  }
}

export const VolunteerCollection = 'volunteers';
