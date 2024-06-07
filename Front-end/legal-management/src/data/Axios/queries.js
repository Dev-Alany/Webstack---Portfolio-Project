import { userManagementClient } from "../../config";



export const notificationCount = async (user) => {
  try {
    const response = await userManagementClient.post("/data", user);
    return response.data;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};