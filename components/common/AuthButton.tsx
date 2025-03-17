'use client';

import api from '@/api';
import icProfile from '@/assets/images/ic_profile.png';
import { useAuth } from '@/contexts/AuthContext';
import { UserInfoDto } from '@/types/dtos/user.dto';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

function AuthButton() {
  const { isLoggedIn, isAuthInitialized, logOut } = useAuth();

  const { data: userInfo } = useQuery<UserInfoDto>({
    queryKey: ['me'],
    queryFn: api.getMe,
    staleTime: 0,
  });

  console.log(userInfo);

  const handleClickProfile = () => {
    logOut?.();
  };
  if (!isAuthInitialized) return null;

  return (
    <div className="shrink-0">
      {isLoggedIn ? (
        <div
          className="flex items-center cursor-pointer"
          onClick={handleClickProfile}
        >
          <Image src={icProfile} alt="profile" className="w-10 mr-1.5" />

          <p className="text-lg text-[#4d5562]">
            {userInfo ? userInfo.nickname : ''}
          </p>
        </div>
      ) : (
        <Link href="/auth/log-in">
          <Button>로그인</Button>
        </Link>
      )}
    </div>
  );
}

export default AuthButton;
