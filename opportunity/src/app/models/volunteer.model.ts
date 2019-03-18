export class Volunteer {
  id?: string;
  username: string; // email
  name?: string;
  about?: string;
  image?: string;
  dateOfBirth?: string;
  application?: {
    opportunityId?: string;
    opportunityName: string;
    ngoName: string;
    dateCreated: string;
    active: boolean;
  }[];
}

export const VolunteerCollection = 'volunteer';
