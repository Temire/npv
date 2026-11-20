import { getAxiosInstance } from "./instance";

const serviceName = "files";
// const port = "8591";
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "https://npv-api.pario.ng/api/v1/";

export const uploadFile = async (data: any) => {
  const axiosInstance = getAxiosInstance(baseUrl);

  const response = await axiosInstance({
    url: `${serviceName}/upload?userId=${data.userId}`,
    method: "POST",
    data: data?.payload
  });

  return response.data;
};
