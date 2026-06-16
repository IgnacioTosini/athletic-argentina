'use client';

import { useMemo, useState } from "react";
import { Order, OrderItem, OrderStatus } from "@prisma/client";
import { Title } from "@/components/shared/Title/Title";
import {
    deleteOrderAction,
    updateOrderStatusAction,
} from "@/app/actions/utils/orders";
import { toast } from "react-toastify";

import './_ordersSection.scss';

type OrderWithItems = Order & {
    items: OrderItem[];
};

interface Props {
    orders: OrderWithItems[];
    selectedOrder: OrderWithItems | null;
    setSelectedOrder: (
        order: OrderWithItems | null
    ) => void;
}
const orderStatusLabel = {
    [OrderStatus.PENDING]: "Pendiente",
    [OrderStatus.CONFIRMED]: "Confirmado",
    [OrderStatus.SHIPPED]: "Enviado",
    [OrderStatus.DELIVERED]: "Entregado",
    [OrderStatus.CANCELLED]: "Cancelado",
};

export const OrdersSection = ({
    orders,
    selectedOrder,
    setSelectedOrder,
}: Props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = useMemo(() => {
        const query = searchTerm.toLowerCase().trim();

        if (!query) return orders;

        return orders.filter((order) =>
            order.customerName.toLowerCase().includes(query) ||
            order.phone.toLowerCase().includes(query) ||
            order.id.toLowerCase().includes(query)
        );
    }, [orders, searchTerm]);

    const handleDeleteOrder = async (formData: FormData) => {
        const res = await deleteOrderAction(formData);
        if (res.ok) {
            toast.success("Pedido eliminado correctamente");
            setSelectedOrder(null);
        } else {
            toast.error("Error al eliminar el pedido");
        }
    }

    const handleUpdateOrderStatus = async (formData: FormData) => {
        const res = await updateOrderStatusAction(formData);
        if (res.ok) {
            toast.success("Estado del pedido actualizado");
        } else {
            toast.error("Error al actualizar el estado del pedido");
        }
    }
    return (
        <section className="adminOrders">
            <div className="adminOrdersContainer">
                <header className="adminOrdersHeader">
                    <div>
                        <Title
                            title="Administrador"
                            subTitle="Pedidos"
                        />

                        <p className="adminOrdersSubtitle">
                            Gestión de pedidos realizados por los clientes.
                        </p>
                    </div>

                    <div className="adminOrdersCountCard">
                        <span className="adminOrdersCountLabel">
                            Pedidos
                        </span>

                        <span className="adminOrdersCountValue">
                            {orders.length}
                        </span>
                    </div>
                </header>

                <section className="adminOrdersGrid">

                    {/* LISTADO */}

                    <article className="adminOrdersCard">
                        <div className="adminOrdersCardHeader">
                            <h2 className="adminOrdersCardTitle">
                                Listado
                            </h2>

                            <input
                                type="text"
                                placeholder="Buscar pedido..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                                className="adminOrdersSearch"
                            />
                        </div>

                        <div className="adminOrdersTableWrap">
                            <table className="adminOrdersTable">
                                <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th>Teléfono</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredOrders.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="adminOrdersEmptyCell"
                                            >
                                                No hay pedidos.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id}>
                                                <td>
                                                    {order.customerName}
                                                </td>

                                                <td>
                                                    {order.phone}
                                                </td>

                                                <td>
                                                    {order.items.length}
                                                </td>

                                                <td>
                                                    {Number(
                                                        order.total
                                                    ).toLocaleString(
                                                        "es-AR",
                                                        {
                                                            style: "currency",
                                                            currency: "ARS",
                                                        }
                                                    )}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`adminOrdersBadge ${order.status.toLowerCase()}`}
                                                    >
                                                        {
                                                            orderStatusLabel[
                                                            order.status
                                                            ]
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString(
                                                        "es-AR"
                                                    )}
                                                </td>

                                                <td>
                                                    <div className="adminOrdersActions">
                                                        <button
                                                            type="button"
                                                            className="adminOrdersLinkButton"
                                                            onClick={() => setSelectedOrder(order)}
                                                        >
                                                            Ver
                                                        </button>

                                                        <form action={(formData) => handleDeleteOrder(formData)}>
                                                            <input
                                                                type="hidden"
                                                                name="orderId"
                                                                value={order.id}
                                                            />

                                                            <button
                                                                type="submit"
                                                                className="adminOrdersDangerButton"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </article>

                    {/* DETALLE */}

                    <article className="adminOrdersCard">

                        {selectedOrder ? (
                            <>
                                <h2 className="adminOrdersCardTitle">
                                    Detalle del Pedido
                                </h2>

                                <div className="adminOrdersDetails">

                                    <div className="adminOrdersField">
                                        <strong>ID</strong>
                                        <span>
                                            {selectedOrder.id}
                                        </span>
                                    </div>

                                    <div className="adminOrdersField">
                                        <strong>Cliente</strong>
                                        <span>
                                            {selectedOrder.customerName}
                                        </span>
                                    </div>

                                    <div className="adminOrdersField">
                                        <strong>Teléfono</strong>
                                        <span>
                                            {selectedOrder.phone}
                                        </span>
                                    </div>

                                    {selectedOrder.email && (
                                        <div className="adminOrdersField">
                                            <strong>Email</strong>
                                            <span>
                                                {selectedOrder.email}
                                            </span>
                                        </div>
                                    )}

                                    <div className="adminOrdersField">
                                        <strong>Total</strong>

                                        <span>
                                            {Number(
                                                selectedOrder.total
                                            ).toLocaleString(
                                                "es-AR",
                                                {
                                                    style: "currency",
                                                    currency: "ARS",
                                                }
                                            )}
                                        </span>
                                    </div>

                                    <form
                                        action={(formData) => handleUpdateOrderStatus(formData)}
                                        className="adminOrdersStatusForm"
                                    >
                                        <input
                                            type="hidden"
                                            name="orderId"
                                            value={selectedOrder.id}
                                        />

                                        <select
                                            name="status"
                                            defaultValue={
                                                selectedOrder.status
                                            }
                                        >
                                            {Object.values(
                                                OrderStatus
                                            ).map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {
                                                        orderStatusLabel[
                                                        status
                                                        ]
                                                    }
                                                </option>
                                            ))}
                                        </select>

                                        <button
                                            type="submit"
                                            className="adminOrdersLinkButton"
                                        >
                                            Actualizar estado
                                        </button>
                                    </form>

                                    <p className="adminOrdersNotes">
                                        <strong>Notas:</strong>{" "}
                                        {selectedOrder.notes ||
                                            "Ninguna"}
                                    </p>

                                    <h3 className="adminOrdersItemsTitle">
                                        Productos
                                    </h3>

                                    <div className="adminOrdersItems">
                                        {selectedOrder.items.map(
                                            (item) => (
                                                <div
                                                    key={item.id}
                                                    className="adminOrdersItem"
                                                >
                                                    <p className="adminOrdersItemName">
                                                        {
                                                            item.productName
                                                        }
                                                    </p>

                                                    <p className="adminOrdersItemInfo">
                                                        Cantidad:{" "}
                                                        {
                                                            item.quantity
                                                        }
                                                    </p>

                                                    <p className="adminOrdersItemInfo">
                                                        Precio unitario:{" "}
                                                        {Number(
                                                            item.price
                                                        ).toLocaleString(
                                                            "es-AR",
                                                            {
                                                                style: "currency",
                                                                currency:
                                                                    "ARS",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="adminOrdersCardTitle">
                                    Detalle
                                </h2>

                                <p className="adminOrdersEmpty">
                                    Selecciona un pedido para ver
                                    sus detalles.
                                </p>
                            </>
                        )}
                    </article>
                </section>
            </div>
        </section>
    );
};