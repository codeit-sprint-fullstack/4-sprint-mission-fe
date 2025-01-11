'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import color from '@/styles/index';

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
            className={`first:ml-6 px-4 text-lg font-semibold hover:text-[${
              color.mainColor
            }] ${
              // 활성화된 메뉴에 컬러 적용
              path.startsWith(navMenu.link)
                ? `text-[${color.mainColor}]`
                : `text-[${color.navTxtColor}]`
            } `}
            key={i}
          >
            <Link href={navMenu.link}>{navMenu.title}</Link>
          </span>
        );
      })}
    </div>
  );
}

export default HeaderNav;
