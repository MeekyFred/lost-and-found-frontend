import axiosInstance from "@/app/utils/axios";

export const getItemsAnalytics = async (payload: any) => {
  const { id } = payload;
  const url = `/items/analytics/${id}`;
  const response = await axiosInstance.get(url);
  return response.data.data;
};

export const getItems = async (payload: any) => {
  const limit = payload?.limit || 10;
  const page = payload?.page || 1;
  const search = payload?.search || "";
  const status = payload?.status || "ALL";

  const url = `/items?limit=${limit}&page=${page}&search=${search}&status=${status}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getItem = async (payload: any) => {
  const { id } = payload;
  const url = `/items/${id}`;
  const response = await axiosInstance.get(url);
  return response.data.data;
};
