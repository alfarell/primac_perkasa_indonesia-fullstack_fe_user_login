import $axios from "../../libs/axios";
import type { IUserData } from "./interface";

export const getUserDetail = () => {
  return $axios.get<IUserData>("/auth/user");
};
