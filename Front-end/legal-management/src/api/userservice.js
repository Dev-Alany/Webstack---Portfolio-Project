// src/api/userService.js
import { userManagementClient } from "../config";

import axios from 'axios';


export const loginCallApi = async (Username, password) => {
  try {
    const response = await axios.post('http://localhost:5000/login', {
      Username,
      password
    });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return 'ERR_NETWORK';
    } else {
      return 'ERR_BAD_REQUEST';
    }
  }
};


export const getAllUsers = async (name) => {
  try {
    const response = await userManagementClient.get(`/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};
export const getAllCompanyRegionView = async () => {
    try {
      const response = await userManagementClient.get("/company");
      return response.data;
    } catch (error) {
      console.error("Error fetching company: ", error);
      throw error;
    }
  };
  export const getAllclientManagementView = async () => {
    try {
      const response = await userManagementClient.get("/http://127.0.0.1:5000/clientManagement");
      return response.data;
    } catch (error) {
      console.error("Error fetching Client: ", error);
      throw error;
    }
  };


  export const getallCases = async () => {
    try {
      const response = await userManagementClient.get("/cases");
      return response.data;
    } catch (error) {
      console.error("Error fetching users: ", error);
      throw error;
    }
  };
export const createUser = async (user) => {
  try {
    const response = await userManagementClient.post("/data", user);
    return response.data;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await userManagementClient.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};

// Add other CRUD operations similarly
