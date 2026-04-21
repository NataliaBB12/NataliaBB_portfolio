import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const momoSignature = localFont({
  src: "../public/fonts/MomoSignature-Regular.woff2",
  variable: "--font-momo",
  display: "swap",
  weight: "400",
});
