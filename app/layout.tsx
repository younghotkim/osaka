import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConfirmProvider } from "./components/ConfirmProvider";
import { PinGate } from "./components/PinGate";
import { PwaRegister } from "./components/PwaRegister";
import { TranslateFab } from "./components/TranslateFab";

export const metadata: Metadata = {
  title: "Y&S Osaka · 大阪 食い倒れ Trip Diary",
  description: "7.2-7.4 오사카 둘만의 여행 — 일정·준비·기록·회고",
  applicationName: "Y&S Osaka",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Y&S Osaka"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#d4356c"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <PinGate>
          <ConfirmProvider>
            {children}
            <TranslateFab />
          </ConfirmProvider>
        </PinGate>
        <PwaRegister />
      </body>
    </html>
  );
}
