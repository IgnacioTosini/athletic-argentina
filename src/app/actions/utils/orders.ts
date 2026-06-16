"use server";

import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/serializePrisma";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

type CreateOrderInput = {
    customerName: string;
    phone: string;
    notes?: string;

    items: {
        productId: string;
        quantity: number;
    }[];
};

export async function createOrderAction(
    data: CreateOrderInput
) {
    return prisma.$transaction(async (tx) => {
        if (data.items.length === 0) {
            return {
                ok: false,
                message: "El carrito está vacío.",
            };
        }

        let total = 0;

        const orderItems: {
            productId: string;
            productName: string;
            quantity: number;
            price: number;
        }[] = [];

        for (const item of data.items) {
            const product =
                await tx.product.findUnique({
                    where: {
                        id: item.productId,
                    },
                });

            if (!product) {
                return {
                    ok: false,
                    message: "Producto no encontrado.",
                };
            }

            const stockUpdated =
                await tx.product.updateMany({
                    where: {
                        id: item.productId,
                        stock: {
                            gte: item.quantity,
                        },
                    },
                    data: {
                        stock: {
                            decrement:
                                item.quantity,
                        },
                    },
                });

            if (stockUpdated.count === 0) {
                return {
                    ok: false,
                    message: `Stock insuficiente para ${product.name}.`,
                };
            }

            const price = Number(
                product.price
            );

            total +=
                price * item.quantity;

            orderItems.push({
                productId: item.productId,
                productName: product.name,
                quantity: item.quantity,
                price,
            });
        }

        const order =
            await tx.order.create({
                data: {
                    customerName:
                        data.customerName,
                    phone: data.phone,
                    notes: data.notes,
                    total,
                    status:
                        OrderStatus.PENDING,

                    items: {
                        create: orderItems,
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

        revalidatePath("/admin");
        revalidatePath("/");

        return {
            ok: true,
            order,
        };
    });
}

export async function getAllOrders() {
    const orders = await prisma.order.findMany({
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return serializePrisma(orders);
}

export async function getOrderById(
    orderId: string
) {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    return serializePrisma(order);
}

export async function updateOrderStatusAction(
    formData: FormData
) {
    const orderId = formData.get("orderId") as string;
    const status = formData.get("status") as OrderStatus;

    const order = await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status,
        },
    });

    if (!order) {
        return {
            ok: false,
            message: "Pedido no encontrado.",
        };
    }

    revalidatePath("/admin");

    return {
        ok: true,
        order,
    };
}

export async function deleteOrderAction(
    formData: FormData
) {
    const orderId = formData.get("orderId") as string;

    const order = await prisma.order.delete({
        where: {
            id: orderId,
        },
    });

    if (!order) {
        return {
            ok: false,
            message: "Pedido no encontrado.",
        };
    }

    revalidatePath("/admin");
    return {
        ok: true,
    };
}