// src/config.js
import axios from 'axios';

// Helper function to create an Axios instance with authentication
const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      const formattedToken = token ? `Bearer ${token.replace(/"/g, "")}` : null;
      if (formattedToken) {
        config.headers['Authorization'] = formattedToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const userManagementClient = createAxiosInstance("http://127.0.0.1:5000/data");

export const loginUrl = {
  login: "https://sheriapro.mcb.co.ke/gateway/login",
};
export const roleManagementUrl = {
  uri: "https://sheriapro.mcb.co.ke/gateway/rolemanagement",
};
export const caseManagementUrl = {
  uri: "https://sheriapro.mcb.co.ke/gateway/casemanagement",
};
export const setupManagementUrl = {
  uri: "https://sheriapro.mcb.co.ke/gateway/setupmanagement",
};
export const clientManagementUrl = {
  uri: "https://sheriapro.mcb.co.ke/gateway/clientmanagement",
};
export const userManagementUrl = {
  uri: "http://127.0.0.1:5000/data",
};
export const accountsAndFinanceUrl = {
  uri: "https://sheriapro.mcb.co.ke/gateway/accountsmanagement",
};
export const documentUploadUrl = {
  uri: "https://localhost:7294/documentmanagement/UploadCaseDocument",
  // uri: "https://sheriapro.mcb.co.ke/gateway/documentmanagement/UploadCaseDocument",
};
export const companyManagementUrl = {
  uri: "https://sheriapro.mcb.co.ke/gateway/companymanagement",
};
