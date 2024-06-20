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
    console.error(`Failed to fetch Data: $error`);
    throw error;
  }
};
