import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "700", "900"],
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Tam Quoc Sat - Vu Tuong Giac Tinh",
  description: "Trang chu chinh thuc cua game Tam Quoc Sat - Vu Tuong Giac Tinh. Tai game ngay de trai nghiem the gioi Tam Quoc huyen thoai!",
  keywords: ["Tam Quoc Sat", "game", "Three Kingdoms", "strategy", "mobile game"],
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${notoSans.variable} ${notoSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
