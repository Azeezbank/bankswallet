

import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { Bricolage_Grotesque } from "next/font/google";

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const brico = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-brico",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${brico.className} antialiased
        bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}