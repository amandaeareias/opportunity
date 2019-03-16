export interface NGO {
  username: string;
  labels: string[];
  image: string;
  description: string;
  contacData: {
    website: string;
    address: string;
    email: string;
    phone: string;
    jobs: string[];
  };
}
