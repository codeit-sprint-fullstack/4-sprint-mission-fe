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
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ErrorModal from "../_components/ErrorModal";
import { useModal } from "@/contexts/ModalContext";

const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.+[a-zA-Z]/;

function LoginPage() {
  const router = useRouter();
  const modal = useModal();
  const { logIn } = useAuth();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" });

  const [disabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState("inactive");

  const { mutate: signIn } = useMutation({
    mutationFn: (dto) => api.logIn(dto),
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
    if (userData.email === "" || userData.password === "") {
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const errors = {
      email: handleErrorMsg("email", email.value),
      password: handleErrorMsg("password", password.value),
    };
    setErrorMsg(errors);
    if (errorMsg.email === "" && errorMsg.password === "") {
      signIn(userData);
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
          <div className="flex flex-col gap-2">
            <InputBox
              title="이메일"
              name="email"
              onChange={handleChange}
              userData={userData.email}
              placeholder="이메일을 입력해주세요"
              onBlur={handleBlur}
              errorMsg={errorMsg.email}
            />
          </div>

          <InputBox
            title="비밀번호"
            name="password"
            onChange={handleChange}
            userData={userData.password}
            placeholder="비밀번호를 입력해주세요"
            onBlur={handleBlur}
            errorMsg={errorMsg.password}
          />

          {/* 버튼 */}
          <Button
            className="w-full h-14 rounded-[40px] px-[124px] py-4"
            type={isActive}
            disabled={disabled}
          >
            로그인
          </Button>
        </form>

        {/* 간편 로그인 */}
        <SocialLogin />

        {/* 회원가입 이동 */}
        <div className="flex justify-center gap-1 font-medium">
          <p>판다마켓이 처음이신가요?</p>{" "}
          <Link href="/signup" className="text-blue">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
