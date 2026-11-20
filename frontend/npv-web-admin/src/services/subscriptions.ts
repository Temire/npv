import { getAxiosInstance } from "./instance";

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "https://npv-api.pario.ng/api/v1/";
const serviceName = "subscription";

export const getAllSubscriptionPlans = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}?pageSize=${data?.pageSize}&pageNumber=${data?.pageNumber}`,
    method: "GET"
  });

  return response.data;
};

export const createSubscriptionPlan = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}`,
    method: "POST",
    data
  });

  return response.data;
};

export const updateSubscriptionPlan = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/${data?.planId}`,
    method: "PUT",
    data
  });

  return response.data;
};

export const deleteSubscriptionPlan = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/${data?.planId}`,
    method: "DELETE"
  });

  return response.data;
};
