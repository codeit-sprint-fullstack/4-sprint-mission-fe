"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/svg/pandaLogo.svg";
import Link from "next/link";
import Button from "@/components/Button";
import InputBox from "../_components/InputBox";
import SocialLogin from "../_components/SocialLogin";

function SignupPage() {
  const [userData, setUserData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState("inactive");

  useEffect(() => {
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.passwordCheck === "" ||
      userData.nickname === ""
    ) {
      setDisabled(true);
      setIsActive("inactive");
    } else {
      setDisabled(false);
      setIsActive("active");
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            handleChange={handleChange}
            userData={userData}
            placeholder="이메일을 입력해주세요"
          />
          <InputBox
            title="닉네임"
            name="nickname"
            handleChange={handleChange}
            userData={userData}
            placeholder="닉네임임을 입력해주세요"
          />
          <InputBox
            title="비밀번호"
            name="password"
            handleChange={handleChange}
            userData={userData}
            placeholder="비밀번호를 입력해주세요"
          />
          <InputBox
            title="비밀번호 확인"
            name="passwordCheck"
            handleChange={handleChange}
            userData={userData}
            placeholder="비밀번호를 다시 한 번 입력해주세요요"
          />

          {/* 버튼 */}
          <Button
            className="w-full h-14 rounded-[40px] px-[124px] py-4"
            isActive={isActive}
            disabled={disabled}
          >
            로그인
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
