import { UserLoginProfile } from './userLoginProfile';

export interface User {
  ipLocation: any;
  ngo: string[];
  auth: UserLoginProfile;
  volunteer: string;
}