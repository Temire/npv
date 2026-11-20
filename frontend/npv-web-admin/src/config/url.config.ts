const setupBaseUrl = (port: string) => {
  return `http://161.35.9.144:${port}/api/v1/`;
};

export const urlConfig = (port: string) => {
  return {
    baseUrl: setupBaseUrl(port)
  };
};
