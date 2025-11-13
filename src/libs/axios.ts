import axios from "axios";
import { getAccessToken } from "./auth-storage";

const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

$axios.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    // set authorization token to current request
    const bearerToken = `Bearer ${accessToken}`;
    config.headers.Authorization = bearerToken;

    // set authorization token to next request (as default headers)
    setAxiosToken(accessToken);
  }

  return config;
});

$axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isUnauthorized = error.response?.status === 401;
    const isNotLoginApi = !error.request?.path?.includes("login");

    if (isUnauthorized && isNotLoginApi) {
      removeAxiosToken();
    }

    throw error;
  }
);

export const setAxiosToken = (token: string) => {
  $axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAxiosToken = () => {
  $axios.defaults.headers.common.Authorization = undefined;
};

export default $axios;
