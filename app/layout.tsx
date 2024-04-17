import type { Metadata } from "next";
import "./globals.css";
import { inter } from './fonts'
import { PlayerProvider } from '@/app/context'

export const metadata: Metadata = {
  title: "SUMMER RANKING 2024",
  description: "hs basketball player ranking website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className={inter.className}>
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}
