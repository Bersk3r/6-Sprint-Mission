import SortIcon from "@/src/assets/images/icons/ic_sort.svg";
import { useEffect, useState } from "react";
import style from "./DropDown.module.scss";
import { ArticleSort } from "../../types/articleTypes";

interface DropdownProps {
  onSortSelection: (sortOption: ArticleSort) => void;
}

export default function Dropdown({ onSortSelection }: DropdownProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [text, setText] = useState("최신순");
  const [windowWidth, setWindowWidth] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (windowWidth === 0) setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    window.addEventListener("beforeunload", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("beforeunload", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className={style.sort_button_wrapper}>
      {windowWidth < 767 ? (
        <button
          className={style.sort_dropdown_trigger_button}
          onClick={toggleDropdown}
        >
          <SortIcon />
        </button>
      ) : (
        <button
          className={style.sort_dropdown_trigger_button}
          onClick={toggleDropdown}
        >
          {text}
        </button>
      )}

      {isDropdownVisible && (
        <div className={style.dropdown_menu_container}>
          <div
            className={style.dropdown_item}
            onClick={() => {
              onSortSelection("recent");
              setIsDropdownVisible(false);
              setText("최신 순");
            }}
          >
            최신 순
          </div>
          <div
            className={style.dropdown_item}
            onClick={() => {
              onSortSelection("like");
              setIsDropdownVisible(false);
              setText("좋아요 순");
            }}
          >
            좋아요 순
          </div>
        </div>
      )}
    </div>
  );
}
