import axios from "./axios";

interface SetArticleQueries {
  // image?: null | FileList;
  content?: string;
  title?: string;
  token?: string | null;
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

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Data: ${error}`);
    throw error;
  }
};
