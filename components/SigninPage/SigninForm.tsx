import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "./SigninForm.module.scss";
import Link from "next/link";
import KakaoIcon from "../../src/assets/images/social/kakao-logo.png";
import GoogleIcon from "../../src/assets/images/social/google-logo.png";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "../../api/axios";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "잘못된 이메일 형식입니다."
    )
    .required("이메일을 입력해주세요"),
  password: yup
    .string()
    .min(8, "비밀번호를 8자 이상 입력해주세요")
    .required("비밀번호를 입력해주세요"),
});

export default function SigninForm() {
  const router = useRouter();
  const { register, watch, handleSubmit, setValue, getValues, formState } =
    useForm({
      mode: "onBlur",
      resolver: yupResolver(schema),
    });
  const { login } = useAuth(false);
  const [validate, setValidate] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;
    await login({
      email,
      password,
    });
    router.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/");
    }
  }, [router]);

  const handleBlur = () => {
    const isValidForm =
      !getValues(["email", "password"]).includes("") &&
      Object.keys(formState.errors).length === 0;
    setValidate(isValidForm);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form_container}>
      <div className={style.form_top}>
        <div className={style.form_element}>
          <label className={style.form_label}>이메일</label>
          <input
            {...register("email", {
              onBlur: handleBlur,
            })}
            type="text"
            placeholder="이메일을 입력해주세요."
            className={
              formState.errors.email
                ? `${style.form_input} ${style.invalid}`
                : style.form_input
            }
          />
          <div className={style.invalid_message}>
            {formState.errors.email?.message}
          </div>
        </div>
        <div className={style.form_element}>
          <label className={style.form_label}>비밀번호</label>
          <input
            {...register("password", {
              onBlur: handleBlur,
            })}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className={
              formState.errors.password
                ? `${style.form_input} ${style.invalid}`
                : style.form_input
            }
          />
          <div className={style.invalid_message}>
            {formState.errors.password?.message}
          </div>
        </div>
      </div>
      <div className={style.form_bottom}>
        <div className={style.submit_button_box}>
          <input
            type="submit"
            value="로그인"
            className={
              validate
                ? `${style.submit_button} ${style.active}`
                : style.submit_button
            }
            disabled={!validate}
          />
        </div>
        <div className={style.social_login_box}>
          <h3 className={style.social_login_title}>간편 로그인하기</h3>
          <div className={style.social_login_links}>
            <Link href="https://google.com">
              <div className={style.image}>
                <Image fill src={GoogleIcon} alt="구글 로그인" />
              </div>
            </Link>
            <Link href="https://kakao.com">
              <div className={style.image}>
                <Image fill src={KakaoIcon} alt="카카오톡 로그인" />
              </div>
            </Link>
          </div>
        </div>
        <div className={style.navigate_link_box}>
          <h3 className={style.navigate_link_title}>
            판다마켓이 처음이신가요?
          </h3>
          <Link href="/signup" className={style.navigate_link_content}>
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
}
