import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { Analytics } from "@vercel/analytics/next";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Athletic Argentina",
  description:
    "Una plataforma para gestionar y descubrir clubes deportivos en Argentina.",

  openGraph: {
    title: "Athletic Argentina",
    description:
      "Descubrí clubes deportivos en Argentina y conectá con el fútbol local.",
    url: "https://athletic-argentina.vercel.app",
    siteName: "Athletic Argentina",
    images: [
      {
        url: "/heroImage.jpg",
        width: 1200,
        height: 630,
        alt: "Athletic Argentina",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Athletic Argentina",
    description:
      "Descubrí clubes deportivos en Argentina y conectá con el fútbol local.",
    images: ["/heroImage.jpg"],
  },
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await isAdminAuthenticated();

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      {children}
      <Footer />
      <Analytics />
    </>
  );
}