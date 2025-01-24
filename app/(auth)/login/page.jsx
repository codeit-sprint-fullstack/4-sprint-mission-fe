"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/svg/pandaLogo.svg";
import Link from "next/link";
import Button from "@/components/Button";
import InputBox from "../_components/InputBox";
import SocialLogin from "../_components/SocialLogin";

function loginPage() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  // const [error, setError] = useState({ email: "", password: "" });

  const [disabled, setDisabled] = useState(true);
  const [isActive, setIsActive] = useState("inactive");

  useEffect(() => {
    if (userData.email === "" || userData.password === "") {
      //disable없애고 errorMsg 없으면 진행 있으면 강조
      setDisabled(true);
      setIsActive("inactive");
    } else {
      setDisabled(false);
      setIsActive("active");
    }
  }, [userData]);

  // const handleErrorMsg = (name, value) => {
  //   switch (name) {
  //     case "email":
  //       if (!value) return "이메일을 입력해주세요";
  //       return "";
  //     case "password":
  //       if (!value) return "비밀번호를 입력해주세요";
  //   }
  // };

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
    // const errorMsg = handleErrorMsg(name, value);
    // setError((prev) => ({ ...prev, [name]: errorMsg }));
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
              handleChange={handleChange}
              userData={userData}
              placeholder="이메일을 입력해주세요"
            />
            {/* {error.email && <div className="text-red pl-4">{error.email}</div>} */}
          </div>

          <InputBox
            title="비밀번호"
            name="password"
            handleChange={handleChange}
            userData={userData}
            placeholder="비밀번호를 입력해주세요"
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
          <p>판다마켓이 처음이신가요?</p>{" "}
          <Link href="/signup" className="text-blue">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default loginPage;
