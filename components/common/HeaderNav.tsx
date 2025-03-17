'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 메뉴 확장성 고려
const navMenus = [
  { title: '자유게시판', link: '/articles' },
  { title: '중고마켓', link: '/products' },
];

function HeaderNav() {
  const path = usePathname();

  return (
    <div>
      {navMenus.map((navMenu, i) => {
        return (
          <span
            className={`first:ml-6 px-4 text-lg font-semibold hover:text-[#3692FF] ${
              // 활성화된 메뉴에 컬러 적용
              path.startsWith(navMenu.link)
                ? `text-[#3692FF]`
                : `text-[#4B5563]`
            } `}
            key={i}
          >
            <Link prefetch={true} href={navMenu.link}>
              {navMenu.title}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

export default HeaderNav;
