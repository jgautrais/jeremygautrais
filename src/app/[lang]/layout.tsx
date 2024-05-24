import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { i18n, type Locale } from "../../../i18n-config";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hero',
})

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Jérémy Gautrais • Portfolio",
  description: "Développeur Fullstack PHP/JavaScript",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body className={`${inter.variable} ${josefinSans.variable} flex flex-col items-center mx-auto text-center h-screen font-sans`}>{children}</body>
    </html>
  );
}
