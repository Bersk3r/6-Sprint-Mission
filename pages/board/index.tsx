import BestArticle from "../../components/Boards/BestArticle";
import WholeArticle from "../../components/Boards/WholeArticle";
import style from "./style.module.scss";
import { useState } from "react";
import Dropdown from "../../components/Boards/DropDown";
import SearchBar from "../../components/Boards/SearchBar";
// import style from "./style.module.scss";
// import Button from "@/components/Button";
// import SearchBar from "@/components/SearchBar";
// import DropDown from "@/components/DropDown";
type Sorts = "recent" | "like";

export default function Board() {
  const [order, setOrder] = useState<Sorts>("recent");
  const [keyword, setKeyword] = useState("");

  const handleClickItem = (sort: Sorts) => {
    setOrder(sort);
  };

  const handleSearchItem = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <div className={style.container}>
      <section className={style.article_container}>
        <h2 className={style.title}>베스트 게시물</h2>
        <BestArticle />
      </section>
      <section className={style.article_container}>
        <div className={style.article_container_top}>
          <h2 className={style.title}>게시물</h2>
          <button className={style.button}>글쓰기</button>
        </div>
        <div className={style.article_container_middle}>
          <SearchBar searchKeyword={handleSearchItem} />
          <Dropdown onSortSelection={handleClickItem} />
        </div>
        <WholeArticle orderBy={order} keyword={keyword} />
      </section>
    </div>
  );
}
