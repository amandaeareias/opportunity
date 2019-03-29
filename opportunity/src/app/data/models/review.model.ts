export class Review {
  id?: string;
  ngoId: string;
  volunteerId: string;
  volunteerName?: string;
  volunteerImage?: string;
  rating: number;
  text?: string;
  timeCreated: string;

  constructor() {
    this.ngoId = null;
    this.volunteerId = null;
    this.volunteerName = null;
    this.volunteerImage = null;
    this.rating = null;
    this.text = null;
    this.timeCreated = null;
  }
}
