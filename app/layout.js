import { basicFont } from "@/assets/fonts";
import "./globals.css";

export default function HTMLLayout({ children }) {
  return (
    <html
      lang="kr"
      className={`min-w-max  ${basicFont.className} text-[#1F2937] `}
    >
      <body>{children}</body>
    </html>
  );
}
