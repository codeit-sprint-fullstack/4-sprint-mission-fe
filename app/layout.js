import "./globals.css";

export default function HTMLLayout({ children }) {
  return (
    <html lang="kr">
      <body>{children}</body>
    </html>
  );
}
