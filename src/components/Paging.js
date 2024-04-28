import React, { useState } from "react";
// import './Paging.css';
import Pagination from "react-js-pagination";

const Paging = (
  itemsCount,
  totalPageCount,
  displayCount,
  order,
  keyword,
  onClick
) => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    onClick({ displayCount, order, keyword });
  };

  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={itemsCount} // 한 페이지랑 보여줄 아이템 갯수
      totalItemsCount={totalPageCount} // 총 아이템 갯수
      pageRangeDisplayed={displayCount} // paginator의 페이지 범위
      prevPageText={"‹"} // "이전"을 나타낼 텍스트
      nextPageText={"›"} // "다음"을 나타낼 텍스트
      onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
    />
  );
};

export default Paging;