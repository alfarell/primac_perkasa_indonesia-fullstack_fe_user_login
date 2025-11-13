const ACCESS_TOKEN_STORAGE_KEY = "accessToken";

export const getAccessToken = (): string => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || "";
  return accessToken;
};

export const setAccessToken = (accessToken: string): void => {
  if (typeof accessToken !== "string") return;

  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
};
