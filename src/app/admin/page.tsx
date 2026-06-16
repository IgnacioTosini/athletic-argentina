import { AdminDashboard } from "@/components/admin/adminDashboard/AdminDashboard";
import { getClubs } from "../actions/club.action";
import { getAllOrders } from "../actions/utils/orders";

export default async function AdminPage() {
  const clubs = await getClubs();
  const orders = await getAllOrders();

  return (
    <AdminDashboard
      clubs={clubs || []}
      orders={orders || []}
    />
  );
}