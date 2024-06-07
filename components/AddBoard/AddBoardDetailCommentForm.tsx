import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import style from "./AddBoardDetailCommentForm.module.scss";
import { getToken } from "../../api/getToken";
import { setArticleCommentsById } from "../../api/setArticleCommentsById";

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

interface AddBoardCommentDetailFormProps {
  articleId: number;
  comments: CommentTypes[];
  setComments: (comments: CommentTypes[]) => void;
}

export default function AddBoardCommentDetailForm({
  articleId,
  comments,
  setComments,
}: AddBoardCommentDetailFormProps) {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [validate, setValidate] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const comment = await setArticleCommentsById({
      content: getValues("comment"),
      articleId,
      token: accessToken,
    });
    setComments([comment, ...comments]);
    setValue("comment", "");
  };

  const AuthUser = async () => {
    const res = await getToken({});
    setAccessToken(res.accessToken);
  };

  const handleChange = () => {
    if (!getValues(["comment"]).includes("")) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  useEffect(() => {
    AuthUser();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form_container}>
      <div className={style.form_top}>
        <label className={style.form_label}>댓글 달기</label>
        <textarea
          {...register("comment", {
            required: "댓글을 입력해주세요.",
            onChange: handleChange,
          })}
          placeholder="댓글을 입력해주세요."
          className={style.form_comment}
        />
      </div>
      <div className={style.form_bottom}>
        <input
          type="submit"
          value="등록"
          className={
            validate
              ? `${style.submit_button} ${style.active}`
              : style.submit_button
          }
          disabled={!validate}
        />
      </div>
    </form>
  );
}
