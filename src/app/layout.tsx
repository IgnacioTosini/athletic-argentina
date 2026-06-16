import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Athletic Argentina",
    template: "%s | Athletic Argentina",
  },
  description:
    "Plataforma para descubrir y gestionar clubes deportivos en Argentina.",
  keywords: [
    "fútbol",
    "clubes",
    "Argentina",
    "deporte",
    "gestión deportiva",
  ],
  authors: [{ name: "Athletic Argentina" }],
  creator: "Athletic Argentina",

  openGraph: {
    title: "Athletic Argentina",
    description:
      "Plataforma para descubrir y gestionar clubes deportivos en Argentina.",
    url: "https://athletic-argentina.vercel.app",
    siteName: "Athletic Argentina",
    images: [
      {
        url: "/heroImage.jpg",
        width: 1200,
        height: 630,
        alt: "Athletic Argentina Logo",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Athletic Argentina",
    description:
      "Plataforma para descubrir y gestionar clubes deportivos en Argentina.",
    images: ["/heroImage.jpg"],
  },

  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${anton.variable}`}>
      <body>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}