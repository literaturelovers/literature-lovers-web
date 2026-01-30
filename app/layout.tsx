import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from '@/components/providers/toaster-provider';
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { Merriweather_Sans } from "next/font/google";

const merriweather = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Literature Mantra",
  description: "A curated collection of literary quotes to inspire and motivate you daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${merriweather.className} antialiased`}
      >
        <ConfettiProvider/>
        <ToastProvider />
        <div className="min-h-screen flex flex-col gap-y-5">
          {children}
        </div>
      </body>
    </html>
  );
}
