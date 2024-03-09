import type { Metadata } from "next";
import localFont from "next/font/local";
import AuthSessionProvider from "./AuthSessionProvider";
import { NewChakraProviders } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const pretendard = localFont({
  src: [
    {
      path: "../fonts/Pretendard/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "fallback",
});

const Godo = localFont({
  src: [
    {
      path: "../fonts/Godo/GodoM.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/../fonts/Godo/GodoB.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-godo",
  display: "fallback",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${Godo.variable} ${pretendard.variable}`}>
        <AuthSessionProvider>
          <NewChakraProviders>{children}</NewChakraProviders>
        </AuthSessionProvider>
      </body>
    </html>
  );
}