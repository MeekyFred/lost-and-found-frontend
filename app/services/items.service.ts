import axiosInstance from "@/app/utils/axios";
import { formatDate } from "@/app/utils/utils";

export const getItems = async (payload: any) => {
  const limit = payload?.limit || 10;
  const page = payload?.page || 1;

  const search = payload?.search;
  const category = payload?.category;
  const status = payload?.status;

  const range = payload?.range;
  const from = range?.from ? formatDate(range.from, "yyyy/MM/DD") : "";
  const to = range?.to ? formatDate(range.to, "yyyy/MM/DD") : "";

  // Initialize URL with limit and page
  let url = `/items?limit=${limit}&page=${page}`;

  // Append other parameters if they exist
  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;
  if (status) url += `&status=${encodeURIComponent(status)}`;
  if (from) url += `&from=${encodeURIComponent(from)}`;
  if (to) url += `&to=${encodeURIComponent(to)}`;

  const response = await axiosInstance.get(url);
  return response.data;
};

export const getItem = async (payload: any) => {
  const { id } = payload;
  const url = `/items/${id}`;
  const response = await axiosInstance.get(url);
  return response.data.data;
};

export const claimItem = async (payload: any) => {
  const { data } = payload;
  const url = "/claims";
  const response = await axiosInstance.post(url, data);
  return response.data.data;
};
