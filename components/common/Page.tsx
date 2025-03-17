import { ReactNode } from 'react';

function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-[1200px] mx-auto mt-6 mb-[200px]">{children}</main>
  );
}

export default PageContainer;
