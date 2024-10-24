import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from '@/hooks/useAuth'; // Adjust the import based on your file structure
import Header from './components/Header/Header';  // Adjust the path if needed
import { LoadingProvider } from '../context/LoadingContext';
import { Toaster } from 'react-hot-toast';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Freelance Connect",
  description: "Freelance Connect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header/>
          <Toaster position="top-right" />
          <LoadingProvider>
          {children}
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
