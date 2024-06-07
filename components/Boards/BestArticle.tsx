import Image from "next/image";
import React from "react";
import style from "./BestArticle.module.scss";
import BestBadge from "../../src/assets/images/board/best-badge.svg";
import HeartIcon from "../../src/assets/images/board/heart-icon.svg";
import { useEffect, useState } from "react";
import { getArticles } from "../../api/getArticles";
import formatDate from "../../lib/formatDate";

interface ArticleList {
  posts: Article[];
  totalCount: number;
}

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

const getWindowSize = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 375) {
      return 1;
    } else if (window.innerWidth < 768) {
      return 2;
    } else {
      return 3;
    }
  }
  return 3;
};

export default function BestArticle() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState(getWindowSize());
  const [windowWidth, setWindowWidth] = useState(0);

  async function getArticleData({ pageSize }: { pageSize: number }) {
    const res = await getArticles({ pageSize });
    if (res) setArticles(res.list);
  }

  useEffect(() => {
    getArticleData({ pageSize });
  }, [pageSize]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setPageSize(getWindowSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <ul className={style.article_list}>
      {articles.map((article) => (
        <li key={article.id} className={style.article}>
          <BestBadge />
          <div className={style.article_top}>
            <h2 className={style.title}>{article.title}</h2>
            {article.image ? (
              <div className={style.image}>
                <Image fill src={article.image} alt={article.title} />
              </div>
            ) : (
              <div className={style.no_image}></div>
            )}
          </div>
          <div className={style.article_bottom}>
            <div className={style.bottom_left}>
              <div className={style.profile}>
                <h3 className={style.profile_name}>
                  {article.writer.nickname}
                </h3>
              </div>
              <div className={style.like_count}>
                <HeartIcon />
                <h3 className={style.like_count_content}>
                  {article.likeCount}
                </h3>
              </div>
            </div>
            <div className={style.bottom_right}>
              <h3 className={style.create_date}>
                {formatDate(article.createdAt)}
              </h3>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
