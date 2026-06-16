'use client';

import { useState } from "react";
import { OrdersSection } from "../ordersSection/OrdersSection";
import { AdminNavbar } from "../adminNavbar/AdminNavbar";
import { ClubWithImages } from "@/types";
import { Order, OrderItem } from "@prisma/client";
import { ClubsSection } from "../clubsSection/ClubsSection";

interface Props {
    clubs: ClubWithImages[];
    orders: (Order & {
        items: OrderItem[];
    })[];
}

export const AdminDashboard = ({
    clubs,
    orders,
}: Props) => {
    const [activeTab, setActiveTab] = useState<"clubs" | "orders">("clubs");
    const [selectedOrder, setSelectedOrder] = useState<(Order & { items: OrderItem[] }) | null>(null);

    return (
        <>
            <AdminNavbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {activeTab === "clubs" && (
                <ClubsSection clubs={clubs} />
            )}

            {activeTab === "orders" && (
                <OrdersSection
                    orders={orders}
                    selectedOrder={selectedOrder}
                    setSelectedOrder={setSelectedOrder}
                />
            )}
        </>
    );
};