export class Volunteer {
  id?: string;
  username: string; // email
  name?: string;
  about?: string;
  image?: string;
  dateOfBirth?: string;
  application?: Object;
}

export const VolunteerCollection = 'volunteers';
