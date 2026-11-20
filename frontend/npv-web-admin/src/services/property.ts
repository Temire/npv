import { getAxiosInstance } from "./instance";

// const port = "8591";
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "https://npv-api.pario.ng/api/v1/";

export const getAllProperties = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `/property?pageSize=${data?.pageSize}&pageNumber=${data?.pageNumber}`,
    method: "GET"
  });

  return response.data;
};

export const getApprovedProperties = async () => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `/property/approved`,
    method: "GET"
  });

  return response.data;
};

export const getSingleProperty = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `/property/${data.propertyId}`,
    method: "GET"
  });

  return response.data;
};

export const getPropertyDocuments = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `/property/document/asset/${data.propertyId}`,
    method: "GET"
  });

  return response.data;
};

export const propertyApproval = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `/property/approval`,
    method: "POST",
    data
  });

  return response.data;
};

export const getUserProperties = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `/property/user/${data.userId}?pageSize=${data?.pageSize}&pageNumber=${data?.pageNumber}`,
    method: "GET"
  });

  return response.data;
};
