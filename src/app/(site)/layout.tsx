import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Athletic Argentina",
  description: "Una plataforma para gestionar y descubrir clubes deportivos en Argentina.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar isAdmin />
      {children}
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
}