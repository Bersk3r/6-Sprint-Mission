import axios from "./axios";

interface GetArticleCommentsByIdQuery {
  articleId: number;
  limit: number;
  cursor?: number;
}

export const getArticleCommentsById = async ({
  articleId,
  limit = 20,
  cursor = 0,
}: GetArticleCommentsByIdQuery) => {
  try {
    const response = await axios.get(`/articles/${articleId}/comments`, {
      params: { limit },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Data: $error`);
    throw error;
  }
};
