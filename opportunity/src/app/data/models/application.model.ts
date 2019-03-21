export class Application {
  volunteerId: string;
  opportunityId: string;
  timeCreated: string;
  active: boolean;
  text: string;
  //the following two data-objects are being passed by cloud function "appendApplicationData"
  volunteerData?: { 
    name: string;
    image: string;
  };
  opportunityData?: {
    ngoName: string;
    name: string; //from here all regarding opportunity itself
    about: string;
    location: string;
    prerequisites?: string[];
    active: boolean;
  };

  constructor() {
    this.volunteerId = null;
    this.opportunityId = null;
    this.timeCreated = null;
    this.active = null;
    this.text = null;
    this.volunteerData = null;
    this.opportunityData = null;
  }
}
