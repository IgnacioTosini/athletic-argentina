"use client";

import { create } from "zustand";
import {
    createJSONStorage,
    persist,
} from "zustand/middleware";

export type CartItem = {
    productId: string;
    clubId: string;

    name: string;
    image: string;

    price: number;
    quantity: number;
};

type AddCartItemInput = Omit<CartItem, "quantity"> & {
    quantity?: number;
};

type CartState = {
    items: CartItem[];

    totalItems: number;
    subtotal: number;

    addItem: (
        item: AddCartItemInput
    ) => void;

    updateItemQuantity: (
        productId: string,
        quantity: number
    ) => void;

    removeItem: (
        productId: string
    ) => void;

    clearCart: () => void;
};

function calculateTotals(
    items: CartItem[]
) {
    return {
        totalItems: items.reduce(
            (acc, item) =>
                acc + item.quantity,
            0
        ),
        subtotal: items.reduce(
            (acc, item) =>
                acc +
                item.price * item.quantity,
            0
        ),
    };
}

export const useCartStore =
    create<CartState>()(
        persist(
            (set) => ({
                items: [],
                totalItems: 0,
                subtotal: 0,

                addItem: (item) => {
                    const safeQuantity =
                        item.quantity &&
                            item.quantity > 0
                            ? item.quantity
                            : 1;

                    set((state) => {
                        const existingIndex =
                            state.items.findIndex(
                                (
                                    cartItem
                                ) =>
                                    cartItem.productId ===
                                    item.productId
                            );

                        let nextItems: CartItem[];

                        if (
                            existingIndex >= 0
                        ) {
                            nextItems =
                                state.items.map(
                                    (
                                        cartItem,
                                        index
                                    ) =>
                                        index ===
                                            existingIndex
                                            ? {
                                                ...cartItem,
                                                quantity:
                                                    cartItem.quantity +
                                                    safeQuantity,
                                            }
                                            : cartItem
                                );
                        } else {
                            nextItems = [
                                ...state.items,
                                {
                                    ...item,
                                    quantity:
                                        safeQuantity,
                                },
                            ];
                        }

                        return {
                            items: nextItems,
                            ...calculateTotals(
                                nextItems
                            ),
                        };
                    });
                },

                updateItemQuantity: (
                    productId,
                    quantity
                ) => {
                    set((state) => {
                        const safeQuantity =
                            Math.max(
                                0,
                                Math.floor(
                                    quantity
                                )
                            );

                        const nextItems =
                            safeQuantity === 0
                                ? state.items.filter(
                                    (
                                        item
                                    ) =>
                                        item.productId !==
                                        productId
                                )
                                : state.items.map(
                                    (
                                        item
                                    ) =>
                                        item.productId ===
                                            productId
                                            ? {
                                                ...item,
                                                quantity:
                                                    safeQuantity,
                                            }
                                            : item
                                );

                        return {
                            items: nextItems,
                            ...calculateTotals(
                                nextItems
                            ),
                        };
                    });
                },

                removeItem: (
                    productId
                ) => {
                    set((state) => {
                        const nextItems =
                            state.items.filter(
                                (item) =>
                                    item.productId !==
                                    productId
                            );

                        return {
                            items: nextItems,
                            ...calculateTotals(
                                nextItems
                            ),
                        };
                    });
                },

                clearCart: () => {
                    set({
                        items: [],
                        totalItems: 0,
                        subtotal: 0,
                    });
                },
            }),
            {
                name: "athletic-cart",
                storage:
                    createJSONStorage(
                        () => localStorage
                    ),
            }
        )
    );