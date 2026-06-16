import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { isAdminAuthenticated } from "@/lib/admin-session";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Athletic Argentina",
  description: "Una plataforma para gestionar y descubrir clubes deportivos en Argentina.",
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
}