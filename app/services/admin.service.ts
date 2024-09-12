import axiosInstance from "@/app/utils/axios";

export const getAnalytics = async () => {
  const url = `/admin/analytics`;
  const response = await axiosInstance.get(url);
  return response.data.data;
};

export const createItem = async (payload: any) => {
  const { data } = payload;
  const url = "/admin/create-item";
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const updateItem = async (payload: any) => {
  const { data } = payload;
  const url = "/admin/update-item";
  const response = await axiosInstance.patch(url, data);
  return response.data;
};

export const getUsers = async (payload: any) => {
  const limit = payload?.limit || 10;
  const page = payload?.page || 1;
  const url = `/admin/users?limit=${limit}&page=${page}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getClaims = async (payload: any) => {
  const limit = payload?.limit || 10;
  const page = payload?.page || 1;
  const url = `/admin/claims?limit=${limit}&page=${page}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const updateClaim = async (payload: any) => {
  const { data } = payload;
  const url = "/admin/update-claim";
  const response = await axiosInstance.patch(url, data);
  return response.data;
};
