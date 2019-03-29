import { Application } from './application.model';

export class Volunteer {
  id?: string;
  username: string; // email
  name: string;
  about?: string | boolean;
  image?: string;
  dateOfBirth?: string;
  applicationsCount?: number;
  isComplete?: boolean;
  contact?: any;
  
  constructor() {
    this.name = null;
    this.username = null;
    this.image = null;
    this.about = false;
    this.applicationsCount = 0;
    this.isComplete = false;
  }
}

export const VolunteerCollection = 'volunteers';
