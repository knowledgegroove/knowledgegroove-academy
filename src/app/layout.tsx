import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Knowledge Groove Academy",
  description: "Your high school success companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-white`}>
        {/* Premium Mesh Background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Base White Background is on body, these are the mesh accents */}

          {/* Top Right - Blue/Purple */}
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/40 blur-[120px]" />

          {/* Bottom Left - Indigo/Blue */}
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-indigo-100/40 to-blue-100/40 blur-[120px]" />

          {/* Center/Random - Subtle Pop */}
          <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-purple-50/30 blur-[100px] animate-pulse duration-[10s]" />

          {/* Noise Overlay for Texture (Optional, adds premium feel) */}
          <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* Content Wrapper to ensure it sits above the mesh */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
