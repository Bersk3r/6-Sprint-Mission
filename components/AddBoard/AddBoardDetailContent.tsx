import React from "react";
import ProfileImage from "../../src/assets/images/ui/ic_profile_small.svg";
import MoreIcon from "../../src/assets/images/icons/ic_kebab.svg";
import HeartIcon from "../../src/assets/images/board/heart-icon.svg";
import formatDate from "../../lib/formatDate";
import style from "./AddBoardDetailContent.module.scss";

type ArticleProps = {
  article: Article;
};

interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  writer: WriterInfo;
}

interface WriterInfo {
  id: number;
  nickname: string;
}

export default function AddBoardDetailContent({ article }: ArticleProps) {
  return (
    <div className={style.container}>
      <div className={style.content_top}>
        <h2 className={style.title}>{article.title}</h2>
        <MoreIcon />
      </div>
      <div className={style.content_bottom}>
        <div className={style.nickname_area}>
          <ProfileImage />
          <h3 className={style.nickname}>{article.writer.nickname}</h3>
          <h3 className={style.date}>{formatDate(article.createdAt)}</h3>
        </div>
        <div className={style.like_count}>
          <HeartIcon />
          <h3 className={style.like_count_content}>{article.likeCount}</h3>
        </div>
      </div>
    </div>
  );
}
