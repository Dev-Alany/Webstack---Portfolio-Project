// src/config.js
import axios from 'axios';

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

export const userManagementClient = createAxiosInstance("http://127.0.0.1:5000");

export const login = {
  login: "http://127.0.0.1:5000/login/",
};
export const notificationservice = {
  uri: "",
};
export const roleManagementUrl = {
  uri: "",
};
export const caseManagementUrl = {
  uri: "",
};
export const setupManagementUrl = {
  uri: "",
};
export const clientManagementUrl = {
  uri: "http://127.0.0.1:5000/clientManagement",
};
export const userManagementUrl = {
  uri: "http://127.0.0.1:5000/data",
};
export const accountsAndFinanceUrl = {
  uri: "",
};
export const documentUploadUrl = {
  uri: "",
};
export const companyManagementUrl = {
  uri: "",
};