/**
 * @satisfies CAF-01-01-AC-06 SEO meta tags present (title, description, OpenGraph)
 */
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CAFE } from "@/app/lib/config/cafe";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${CAFE.name} | Running & Biking Events`,
    template: `%s | ${CAFE.name}`,
  },
  description: CAFE.description,
  openGraph: {
    type: "website",
    siteName: CAFE.name,
    title: `${CAFE.name} | Running & Biking Events`,
    description: CAFE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${CAFE.name} | Running & Biking Events`,
    description: CAFE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
