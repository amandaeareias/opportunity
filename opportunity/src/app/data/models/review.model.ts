export class Review {
  id?: string;
  ngoId: string;
  volunteerId: string;
  rating: number;
  text?: string;
  timeCreated: string;

  constructor() {
    this.id = null;
    this.ngoId = null;
    this.volunteerId = null;
    this.rating = null;
    this.text = null;
    this.timeCreated = null;
  }
}
