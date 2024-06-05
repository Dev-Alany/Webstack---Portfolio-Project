import axios from "axios";
import { loginCallApi } from "../config";

export async function login(username, HashedPassword) {
  var status = "N/A";
  var salt = "N/A";
  const postData = {
    username,
    HashedPassword,
  };

  try {
    const response = await axios.post(loginCallApi, postData); // Use loginCallApi directly
    return response;
  } catch (error) {
    return error.code;
  }
}