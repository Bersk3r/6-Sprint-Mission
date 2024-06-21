import { ChangeEvent } from "react";
import SearchIcon from "../../src/assets/images/icons/ic_search.svg";
import style from "./SearchBar.module.scss";

interface SearchBarProps {
  searchKeyword: (keyword: string) => void;
}

export default function SearchBar({ searchKeyword }: SearchBarProps) {
  const changeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    searchKeyword(e.target.value);
  };

  return (
    <div className={style.container}>
      <SearchIcon />
      <input
        type="search"
        className={style.input_field}
        placeholder="검색할 상품을 입력해주세요"
        onChange={changeInputText}
      />
    </div>
  );
}
