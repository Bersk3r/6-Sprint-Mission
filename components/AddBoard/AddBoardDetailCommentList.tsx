import React from "react";
import ProfileImage from "../../src/assets/images/ui/ic_profile_small.svg";
import MoreIcon from "../../src/assets/images/icons/ic_kebab.svg";
import style from "./AddBoardDetailCommentList.module.scss";
import elapsedTime from "../../lib/elapsedTime";

type CommentsType = {
  comments: CommentTypes[];
};

interface CommentTypes {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  writer: WriterInfo;
}

interface WriterInfo {
  id: number;
  nickname: string;
  image: null | string;
}

export default function AddBoardDetailCommentList({ comments }: CommentsType) {
  return (
    <>
      {comments.length > 0 ? (
        <>
          {comments.map((comment: CommentTypes) => {
            return (
              <div key={comment.id} className={style.container}>
                <div className={style.comment_top}>
                  <h2 className={style.title}>{comment.content}</h2>
                  <MoreIcon />
                </div>
                <div className={style.comment_bottom}>
                  <ProfileImage />
                  <div className={style.nickname_area}>
                    <h3 className={style.nickname}>
                      {comment.writer.nickname}
                    </h3>
                    <h3 className={style.date}>
                      {elapsedTime(comment.createdAt)}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>없습니다.</div>
      )}
    </>
  );
}
