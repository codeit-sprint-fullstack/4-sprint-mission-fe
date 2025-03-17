import icGoogle from '@/assets/images/ic-google.png';
import icKakao from '@/assets/images/ic-kakao.png';
import Image from 'next/image';
import Link from 'next/link';

function AuthFooter({ isLogin = false }) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between h-[74px] bg-[#E6F2FF] rounded-md mt-6 px-6">
        <p>간편 로그인하기</p>
        <div className="flex gap-x-4">
          <Link href="https://www.google.com">
            <Image src={icGoogle} alt="google" className="w-[42px]" />
          </Link>
          <Link href="https://www.kakaocorp.com/page">
            <Image src={icKakao} alt="kakao" className="w-[42px]" />
          </Link>
        </div>
      </div>
      <div className="flex gap-x-1 mt-6 justify-center">
        <p>{isLogin ? '판다마켓이 처음이신가요?' : '이미 회원이신가요?'}</p>
        <Link href={isLogin ? '/auth/sign-up' : '/auth/log-in'}>
          <p className="text-[#3182F6] underline">
            {isLogin ? '회원가입' : '로그인'}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AuthFooter;
