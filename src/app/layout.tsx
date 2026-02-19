import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/footer";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const laluxesFont = localFont({
  src: "../assets/fonts/LaLuxes.woff",
  variable: "--font-laluxes",
});
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Petals | Fresh Flower Delivery Service",
  description: "Fresh flower delivery service for all occasions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${laluxesFont.variable} ${poppins.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
