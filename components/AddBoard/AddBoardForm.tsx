import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import PlusIcon from "../../src/assets/images/icons/ic_plus.svg";
import style from "./AddBoardForm.module.scss";
import Image from "next/image";
import { getToken } from "../../api/getToken";
import { SetArticles } from "../../api/setArticles";

export default function AddBoardForm() {
  const router = useRouter();
  const { register, watch, handleSubmit, setValue, getValues } = useForm();
  const [validate, setValidate] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.image.length <= 0) {
      data.image = null;
    }
    await SetArticles({ ...data, token: accessToken });
    router.push("/board");
    // console.log({ ...data, token: accessToken });
  };

  const image = watch("image");

  const handleClearClick = () => {
    setValue("image", null);
    setImagePreview("");
  };

  const AuthUser = async () => {
    const res = await getToken({});
    setAccessToken(res.accessToken);
  };

  const handleChange = () => {
    if (!getValues(["title", "content"]).includes("")) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  useEffect(() => {
    AuthUser();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form_container}>
        <div className={style.form_top}>
          <h2 className={style.title}>게시글 쓰기</h2>
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
        <div className={style.form_bottom}>
          <div className={style.form_element}>
            <label className={style.form_label}>*제목</label>
            <input
              {...register("title", {
                required: "제목을 입력해주세요.",
                onChange: handleChange,
              })}
              type="text"
              placeholder="제목을 입력해주세요."
              className={style.form_title}
            />
          </div>
          <div className={style.form_element}>
            <label className={style.form_label}>*내용</label>
            <textarea
              {...register("content", {
                required: "내용을 입력해주세요.",
                onChange: handleChange,
              })}
              placeholder="내용을 입력해주세요."
              className={style.form_textarea}
            />
          </div>
          <div className={style.form_element}>
            <label className={style.form_label}>이미지</label>
            <div className={style.image_button_area}>
              <label htmlFor="picture" className={style.image_add_button}>
                <PlusIcon />
                <p>이미지 등록</p>
              </label>
              <input
                {...register("image")}
                id="picture"
                type="file"
                style={{ display: "none" }}
              />
              {imagePreview && (
                <div className={style.image}>
                  <Image fill src={imagePreview} alt="이미지" />
                  <button
                    onClick={handleClearClick}
                    className={style.image_preview_closebtn}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
