// src/api/userService.js
import { userManagementClient } from "../config";

export const getAllUsers = async () => {
  try {
    const response = await userManagementClient.get("/data");
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
      console.error("Error fetching users: ", error);
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
