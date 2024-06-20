import axios from "./axios";

interface GetArticleQueries {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
}

export const getArticles = async ({
  page = 1,
  pageSize = 3,
  orderBy = "like",
  keyword,
}: GetArticleQueries) => {
  try {
    const response = await axios.get("/articles", {
      params: { page, pageSize, orderBy, keyword },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Data: $error`);
    throw error;
  }
};
