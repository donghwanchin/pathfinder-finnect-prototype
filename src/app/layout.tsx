import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pathfinder — AI 금융 네비게이터",
  description: "소상공인을 위한 AI 금융 절감 로드맵 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full gradient-bg">{children}</body>
    </html>
  );
}
