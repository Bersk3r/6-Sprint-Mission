import React from "react";
import style from "./style.module.scss";
import AddBoardForm from "../../components/AddBoard/AddBoardForm";

export default function Addboard() {
  return (
    <div className={style.container}>
      <AddBoardForm />
    </div>
  );
}
