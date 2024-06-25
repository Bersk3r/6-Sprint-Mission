import Image from "next/image";
import React from "react";
import style from "./WholeArticle.module.scss";
import HeartIcon from "../../src/assets/images/board/heart-icon.svg";
import ProfileImage from "../../src/assets/images/ui/ic_profile_small.svg";
import { useEffect, useState } from "react";
import { getArticles } from "../../api/getArticles";
import formatDate from "../../lib/formatDate";
import Link from "next/link";
import { Article, ArticleSort } from "../../types/articleTypes";
interface ArticlePropsType {
  orderBy: ArticleSort;
  keyword: string;
}

export default function WholeArticle({ orderBy, keyword }: ArticlePropsType) {
  const [articles, setArticles] = useState<Article[]>([]);

  async function getArticleData() {
    const res = await getArticles({ orderBy, pageSize: 6, keyword });
    if (res) setArticles(res.list);
  }

  useEffect(() => {
    getArticleData();
  }, [orderBy, keyword]);

  return (
    <ul className={style.article_list}>
      {articles.map((article) => (
        <li key={article.id} className={style.article}>
          <div className={style.article_top}>
            <Link href={`/addboard/${article.id}`} className={style.title}>
              {article.title}
            </Link>
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
                <ProfileImage />
                <h3 className={style.profile_name}>
                  {article.writer.nickname}
                </h3>
              </div>
              <h3 className={style.create_date}>
                {formatDate(article.createdAt)}
              </h3>
            </div>
            <div className={style.bottom_right}>
              <div className={style.like_count}>
                <HeartIcon />
                <h3 className={style.like_count_content}>
                  {article.likeCount}
                </h3>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
