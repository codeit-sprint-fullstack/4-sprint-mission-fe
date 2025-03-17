import { ReactNode } from 'react';
import './globals.css';

export default function HTMLLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
