import axiosInstance from "@/app/utils/axios";

export const userLogin = async (payload: any) => {
  const { data } = payload;
  const response = await axiosInstance.post("/auth/login", data);
  return response.data.data;
};

export const adminLogin = async (payload: any) => {
  const { data } = payload;
  const response = await axiosInstance.post("/auth/admin-login", data);
  return response.data.data;
};

export const register = async (payload: any) => {
  const { data } = payload;
  const response = await axiosInstance.post(`/auth/register`, data);
  return response.data.data;
};

export const verifyEmailLink = async (payload: any) => {
  const data = payload.data;
  const response = await axiosInstance.post("/auth/verify", data);
  return response.data.data;
};
