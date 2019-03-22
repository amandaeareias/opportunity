import { Application } from './application.model';

export class Volunteer {
  id?: string;
  username: string; // email
  name: string;
  about?: string;
  image?: string;
  dateOfBirth?: string;
  application?: Application[];
  isComplete?: boolean;
  contact?: any;
  
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
