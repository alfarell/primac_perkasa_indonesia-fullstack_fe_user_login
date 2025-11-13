export interface IRegisterResponse {
  userId: string;
}

export interface ILoginResponse {
  accessToken: string;
  expiredIn: string;
  duration: number;
  user: IUserData;
}

export interface IUserData {
  id: string;
  username: string;
  email: string;
}
