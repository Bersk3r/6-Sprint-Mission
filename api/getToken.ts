import axios from "./axios";

interface getTokenProps {
  email?: string;
  password?: string;
}

export const getToken = async ({
  email = "",
  password = "",
}: getTokenProps) => {
  const token_email = process.env.NEXT_PUBLIC_EMAIL;
  const token_pw = process.env.NEXT_PUBLIC_PW;

  try {
    const response = await axios.post(
      "/auth/signin",
      {
        // email,
        // password,
        email: token_email,
        password: token_pw,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("잘못된 요청을 보냈습니다.");
  }
};
