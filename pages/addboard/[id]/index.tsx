import React, { useState } from "react";
import style from "./style.module.scss";
import { getArticleCommentsById } from "../../../api/getArticleCommentsById";
import AddBoardDetailCommentList from "../../../components/AddBoard/AddBoardDetailCommentList";
import AddBoardDetailCommentForm from "../../../components/AddBoard/AddBoardDetailCommentForm";
import { getArticleById } from "../../../api/getArticleById";

import AddBoardDetailContent from "../../../components/AddBoard/AddBoardDetailContent";
import { Article } from "../../../types/articleTypes";
import { Comment } from "../../../types/commentTypes";

interface AddboardDetailProps {
  articleId: number;
  article: Article;
  comments: Comment[];
}

export const getServerSideProps = async (context: {
  params: { [x: string]: any };
}) => {
  const articleId = context.params["id"];

  let article;
  try {
    article = await getArticleById({ articleId });
  } catch (error) {
    return {
      notFound: true,
    };
  }

  const res = await getArticleCommentsById({ articleId, limit: 20 });
  const comments = res.list;

  return {
    props: {
      articleId,
      article,
      comments,
    },
  };
};

export default function AddBoardDetail({
  articleId,
  article,
  comments: initialComments,
}: AddboardDetailProps) {
  const [comments, setComments] = useState(initialComments);

  return (
    <div className={style.container}>
      <AddBoardDetailContent article={article} />
      <AddBoardDetailCommentForm
        comments={comments}
        setComments={setComments}
        articleId={articleId}
      />
      <AddBoardDetailCommentList comments={comments} />
    </div>
  );
}
