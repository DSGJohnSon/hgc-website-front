import type { Metadata } from "next";
import {
  Rajdhani,
  Poppins,
  Goldman,
  Montserrat,
  Changa_One,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingDecorations from "@/components/ui/FloatingDecorations";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const goldman = Changa_One({
  variable: "--font-goldman",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HGC - Esports & Gaming",
  description: "Professional esports and gaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${rajdhani.variable} ${goldman.variable} antialiased`}
      >
        <div className="page-wrapper relative">
          <FloatingDecorations />
          <Header />
          <main className="relative z-10 bg-gray-950">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
