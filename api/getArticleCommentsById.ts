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
    throw new Error("잘못된 요청을 보냈습니다.");
  }
};
