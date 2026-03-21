

import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/app/components/theme-provider';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
                   font-sans bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}