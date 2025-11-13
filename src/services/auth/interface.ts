import type { IUserData } from "../user/interface";

export interface IRegisterResponse {
  userId: string;
}

export interface ILoginResponse {
  accessToken: string;
  expiredIn: string;
  duration: number;
  user: Pick<IUserData, "id" | "email" | "username">;
}
