import axios from "axios";

import { baseURL } from "@/app/config";
import { errorEmitter } from "@/app/utils/eventEmitter";

const axiosInstance = axios.create({ baseURL });

let token: string | null = null;

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

axiosInstance.defaults.headers.common = {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
};

export function updateToken(token: string) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem("token", token);
}

axiosInstance.interceptors.response.use(
  (response) => {
    const data = response?.data;
    const success = data?.success;

    if (!success) {
      errorEmitter.emit("error", data);
    }

    return response;
  },
  (error) => {
    const pathname = window?.location?.href;
    let data = error?.response?.data;
    let status = error?.response?.status;

    if (status === 401) {
      errorEmitter.emit("error", data);
    }

    if (status === 401 && !pathname?.includes("login")) {
      errorEmitter.emit("error", data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
