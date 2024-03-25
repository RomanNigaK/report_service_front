import axios from "axios";

const envViteApiBaseUrl = "";

export const axiosInstance = axios.create({
  baseURL: `${envViteApiBaseUrl}/api`,
});

export const tokenFromLocalStorage = () => {
  const persistRoot = localStorage.getItem("persist:root");
  if (persistRoot) {
    const user = JSON.parse(persistRoot);

    const authData = JSON.parse(user.user);
    return authData.authData?.accessToken || undefined;
  }
};



export const axiosInstanceUpdateToken = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

};

export type { RawAxiosRequestConfig } from "axios/index";
