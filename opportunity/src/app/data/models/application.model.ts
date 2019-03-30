export class Application {
  id?: string;
  volunteerId: string;
  opportunityId: string;
  timeCreated: string;
  active: boolean;
  text: string;
  volunteerData?: { 
    name: string;
    image: string;
  };
  opportunityData?: {
    ngoName: string;
    ngoImage: string;
    name: string;
    about: string;
    location: string;
    prerequisites?: string[];
    active: boolean;
  };
}