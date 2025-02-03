"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/svg/pandaLogo.svg";
import Link from "next/link";
import Button from "@/components/Button";
import InputBox from "../_components/InputBox";
import SocialLogin from "../_components/SocialLogin";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import ErrorModal from "../_components/ErrorModal";
import { useAuth } from "@/contexts/AuthContext";

const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.+[a-zA-Z]/;

function SignupPage() {
  const router = useRouter();
  const modal = useModal();
  const { logIn } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState("inactive");

  const { mutate: signUp } = useMutation({
    mutationFn: (userData) => api.signUp(userData),
    onSuccess: () => {
      logIn();
      router.replace("/products");
    },
    onError: (error) => {
      const errorMsg = error.response.data.message;
      modal.open(<ErrorModal>{errorMsg}</ErrorModal>);
    },
  });

  useEffect(() => {
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.passwordConfirmation === "" ||
      userData.nickname === ""
    ) {
      setDisabled(true);
      setIsActive("inactive");
    } else {
      setDisabled(false);
      setIsActive("active");
    }
  }, [userData]);

  const handleErrorMsg = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "이메일을 입력해주세요";
        if (!email_pattern.test(value)) return "잘못된 이메일 형식입니다.";
        return "";
      case "password":
        if (!value) return "비밀번호를 입력해주세요";
        if (value.length < 8) return "비밀번호를 8자 이상 입력해주세요";
        return "";
      case "nickname":
        if (!value) return "닉네임을 입력해주세요";
        return "";
      case "passwordConfirmation":
        if (value !== userData.password) return "비밀번호가 일치하지 않습니다";
        return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, nickname, password, passwordConfirmation } = e.target;
    const errors = {
      email: handleErrorMsg("email", email.value),
      nickname: handleErrorMsg("nickname", nickname.value),
      password: handleErrorMsg("password", password.value),
      passwordConfirmation: handleErrorMsg(
        "passwordConfirmation",
        passwordConfirmation.value
      ),
    };

    setErrorMsg(errors);

    if (
      errorMsg.email === "" &&
      errorMsg.password === "" &&
      errorMsg.nickname === "" &&
      errorMsg.passwordConfirmation === ""
    ) {
      signUp(userData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = handleErrorMsg(name, value);
    setErrorMsg((prev) => ({ ...prev, [name]: errorMsg }));
  };

  return (
    <div className="md:w-[640px] flex flex-col md:gap-10 gap-6 m-auto w-[343px] ">
      {/* 로고 */}
      <div className="md:w-[369px] md:h-[132px] w-[198px] h-[66px] relative self-center">
        <Link href="/">
          <Image src={Logo.src} alt="logo" fill />
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* 입력 칸 */}
          <InputBox
            title="이메일"
            name="email"
            onChange={handleChange}
            userData={userData.email}
            placeholder="이메일을 입력해주세요"
            onBlur={handleBlur}
            errorMsg={errorMsg.email}
          />
          <InputBox
            title="닉네임"
            name="nickname"
            onChange={handleChange}
            userData={userData.nickname}
            placeholder="닉네임임을 입력해주세요"
            onBlur={handleBlur}
            errorMsg={errorMsg.nickname}
          />
          <InputBox
            title="비밀번호"
            name="password"
            onChange={handleChange}
            userData={userData.password}
            placeholder="비밀번호를 입력해주세요"
            onBlur={handleBlur}
            errorMsg={errorMsg.password}
          />
          <InputBox
            title="비밀번호 확인"
            name="passwordConfirmation"
            onChange={handleChange}
            userData={userData.passwordConfirmation}
            placeholder="비밀번호를 다시 한 번 입력해주세요요"
            onBlur={handleBlur}
            errorMsg={errorMsg.passwordConfirmation}
          />

          {/* 버튼 */}
          <Button
            className="w-full h-14 rounded-[40px] px-[124px] py-4"
            type={isActive}
            disabled={disabled}
          >
            회원가입
          </Button>
        </form>

        {/* 간편 로그인 */}
        <SocialLogin />

        {/* 회원가입 이동 */}
        <div className="flex justify-center gap-1 font-medium">
          <p>이미 회원이신가요?</p>{" "}
          <Link href="/login" className="text-blue">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
