import type { Metadata } from "next";
import { inter, momoSignature } from "@/lib/fonts";
import Providers from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://natalia.design"),
  title: "Natalia Bustos — Product Designer",
  description:
    "Product Designer with 5 years of experience in B2C and B2B, focused on scalable, user-centered solutions.",
  openGraph: {
    title: "Natalia Bustos — Product Designer",
    url: "https://natalia.design",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${momoSignature.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-secondary font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
