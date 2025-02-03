'use client';

import Button from '@/components/common/Button';
import PageContainer from '@/components/common/Page';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    // 에러를 확인할 수 있습니다.
    console.error(error);
    console.log(error);
  }, [error]);

  return (
    <PageContainer>
      <div className="w-sm h-60 flex flex-col items-center justify-center">
        <h2 className="text-3xl text-red-500 mb-4">에러가 발생했습니다.</h2>
        <p className="text-xl font-light text-gray-400 mb-10">
          {error.message}
        </p>
        <Button color="red" outline={true} onClick={() => router.back()}>
          이전 페이지로
        </Button>
      </div>
    </PageContainer>
  );
}
