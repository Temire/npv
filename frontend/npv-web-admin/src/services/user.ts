import { getAxiosInstance } from "./instance";

const serviceName = "user";
// const port = "8592";
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "https://npv-api.pario.ng/api/v1/";

export const adminLogin = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    // url: `${serviceName}/login`,
    url: `${serviceName}/admin/login`,
    method: "POST",
    data
  });

  return response.data;
};

export const createAdmin = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/admin/create`,
    method: "POST",
    data
  });

  return response.data;
};

// Get User
export const getUserByEmail = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/email/${data.userEmail}`,
    method: "GET"
  });

  return response.data;
};

export const getUserById = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/id/${data.userId}`,
    method: "GET"
  });

  return response.data;
};

export const getAllUsers = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/all?pageSize=${data?.pageSize}&pageNumber=${data?.pageNumber}`,
    method: "GET"
  });

  return response.data;
};

export const getAllAdminUsers = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/admin/all?pageSize=${data?.pageSize}&pageNumber=${data?.pageNumber}`,
    method: "GET"
  });

  return response.data;
};

export const getAdminUserById = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/admin/id/${data?.id}`,
    method: "GET"
  });

  return response.data;
};

export const getAdminUserByEmail = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/admin/email/${data?.email}`,
    method: "GET"
  });

  return response.data;
};

export const manageUser = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/manage`,
    method: "PUT",
    data
  });

  return response.data;
};

export const manageAdminUser = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/manage-admin`,
    method: "PUT",
    data
  });

  return response.data;
};
