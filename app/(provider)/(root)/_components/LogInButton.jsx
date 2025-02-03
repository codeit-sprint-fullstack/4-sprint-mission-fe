"use client";
import api from "@/api";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import defaultUserImage from "@/assets/svg/defualt_user_image.svg";

function LogInButton() {
  const { isLoggedIn, logOut, isAuthInitialized } = useAuth();

  const { data: userData } = useQuery({
    queryFn: api.getUserData,
    queryKey: ["userData"],
    initialData: {},
    enabled: isLoggedIn,
  }); //key에 뭘 넣는게 좋지?

  if (!isAuthInitialized) return;

  return (
    // 외부에서 이미지 받아올때는 img 태그?? 순간 바뀜 질문
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          {userData.image ? (
            <img
              src={userData.image}
              alt="userProfileImage"
              width={40}
              height={40}
              onClick={logOut}
              onError={(e) => (e.target.src = defaultUserImage.src)}
              className="rounded-lg aspect-square"
            />
          ) : (
            <img
              src={defaultUserImage.src}
              alt="userProfileImage"
              width={40}
              height={40}
              onClick={logOut}
            />
          )}
          <p>{userData.nickname}</p>
        </div>
      ) : (
        <Link href="/login">
          <Button
            color="blue"
            className="px-[23px] py-[23px] rounded-lg w-[128px] h-12 "
          >
            로그인
          </Button>
        </Link>
      )}
    </>
  );
}

export default LogInButton;
