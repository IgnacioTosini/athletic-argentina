import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Panel de administración de Athletic Argentina",

  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}