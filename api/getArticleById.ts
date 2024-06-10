import axios from "./axios";

interface GetArticleByIdQuery {
  articleId: number;
}

export const getArticleById = async ({
  articleId = 1,
}: GetArticleByIdQuery) => {
  try {
    const response = await axios.get(`/articles/${articleId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("잘못된 요청을 보냈습니다.");
  }
};
