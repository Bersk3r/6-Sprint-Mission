import axios from "./axios";

interface SetArticleCommentsByIdQuery {
  articleId: number;
  content: string;
  token: string;
}

export const setArticleCommentsById = async ({
  articleId = 1,
  content = "",
  token = "",
}: SetArticleCommentsByIdQuery) => {
  try {
    const response = await axios.post(
      `/articles/${articleId}/comments`,
      {
        content: content,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("잘못된 요청을 보냈습니다.");
  }
};
