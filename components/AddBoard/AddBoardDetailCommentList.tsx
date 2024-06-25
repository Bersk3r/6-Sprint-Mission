import React from "react";
import ProfileImage from "../../src/assets/images/ui/ic_profile_small.svg";
import MoreIcon from "../../src/assets/images/icons/ic_kebab.svg";
import style from "./AddBoardDetailCommentList.module.scss";
import EmptyCommentIcon from "../../src/assets/images/ui/empty-comments.svg";
import elapsedTime from "../../lib/elapsedTime";
import { Comment } from "../../types/commentTypes";

type CommentsType = {
  comments: Comment[];
};

export default function AddBoardDetailCommentList({ comments }: CommentsType) {
  return (
    <>
      {comments.length > 0 ? (
        <>
          {comments.map((comment: Comment) => {
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
        <div className={style.empty_icon}>
          <EmptyCommentIcon />
          <h3 className={style.empty_icon_content}>댓글이 없습니다.</h3>
        </div>
      )}
    </>
  );
}
