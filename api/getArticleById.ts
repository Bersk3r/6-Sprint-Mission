import axios from "./axios";

interface GetArticleByIdQuery {
  articleId: number;
}

export const getArticleById = async ({ articleId }: GetArticleByIdQuery) => {
  try {
    const response = await axios.get(`/articles/${articleId}`, {});

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Data: ${error}`);
    throw error;
  }
};
