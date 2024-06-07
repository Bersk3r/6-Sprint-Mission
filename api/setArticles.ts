import axios from "./axios";

interface SetArticleQueries {
  // image?: null | FileList;
  content?: string;
  title?: string;
  token?: string;
}

export const SetArticles = async ({
  // image = null,
  content = "",
  title = "",
  token = "",
}: SetArticleQueries) => {
  try {
    const response = await axios.post(
      "/articles",
      {
        // image: image,
        content: content,
        title: title,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("accessToken", token);

    return response.data;
  } catch (error) {
    throw new Error("잘못된 요청을 보냈습니다.");
  }
};
