'use client';

import Image from "next/image";
import './_adminNavbar.scss';

interface Props {
    activeTab: "clubs" | "orders";
    setActiveTab: (
        tab: "clubs" | "orders"
    ) => void;
}

export const AdminNavbar = ({
    activeTab,
    setActiveTab,
}: Props) => {
    return (
        <nav className="admin-navbar">
            <div className="nav-content">
                <button
                    className={
                        activeTab === "clubs"
                            ? "active clubsButton"
                            : "clubsButton"
                    }
                    onClick={() =>
                        setActiveTab("clubs")
                    }
                >
                    Clubes
                </button>

                <Image
                    src="/logo.jpg"
                    alt="logo"
                    width={40}
                    height={40}
                />

                <button
                    className={
                        activeTab === "orders"
                            ? "active ordersButton"
                            : "ordersButton"
                    }
                    onClick={() =>
                        setActiveTab("orders")
                    }
                >
                    Órdenes
                </button>
            </div>
        </nav>
    );
};