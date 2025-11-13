import $axios from "../../libs/axios";
import type { LoginFormType } from "../../validations/login";
import type { RegisterFormType } from "../../validations/register";
import type { ILoginResponse, IRegisterResponse } from "./interface";

export const registerAccount = (payload: RegisterFormType) => {
  return $axios.post<IRegisterResponse>("/auth/register", payload);
};

export const loginAccount = (payload: LoginFormType) => {
  return $axios.post<ILoginResponse>("/auth/login", payload);
};
