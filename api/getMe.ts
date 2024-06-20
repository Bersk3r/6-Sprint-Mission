import axios from "./axios";

export async function getMe() {
  try {
    let nextUser;
    const response = await axios.get("/users/me");
    nextUser = response.data;
    return nextUser;
  } catch (error) {
    throw new Error("잘못된 요청을 보냈습니다.");
  }
}
