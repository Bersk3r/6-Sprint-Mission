import axios from "./axios";

export async function getMe() {
  try {
    let nextUser;
    const response = await axios.get("/users/me");
    nextUser = response.data;
    return nextUser;
  } catch (error) {
    console.error(`Failed to fetch Data: ${error}`);
    throw error;
  }
}
