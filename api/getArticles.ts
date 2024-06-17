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
    throw new Error("잘못된 요청을 보냈습니다.");
  }
};
