export interface UserLoginProfile {
  authToken?: string;
  displayName: string;
  isAuth: boolean;
  isLogged: boolean;
  loginEmail: string;
  photoURL?: string;
}