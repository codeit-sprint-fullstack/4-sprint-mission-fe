import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
