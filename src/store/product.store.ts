import { Product } from "@prisma/client";
import { create } from "zustand";

interface ProductModalStore {
    isOpen: boolean;
    editingProductId: string | null;
    editingProduct: Product | null;
    clubId: string | null;

    openCreate: (clubId: string | null) => void;
    openEdit: (product: Product) => void;
    close: () => void;
}

export const useProductModalStore =
    create<ProductModalStore>((set) => ({
        isOpen: false,
        editingProductId: null,
        editingProduct: null,
        clubId: null,

        openCreate: (clubId: string | null) =>
            set({
                isOpen: true,
                clubId: clubId,
                editingProductId: null,
                editingProduct: null,
            }),
            
        openEdit: (product: Product) =>
            set({
                isOpen: true,
                editingProductId: product.id,
                editingProduct: product,
                clubId: product.clubId,
            }),

        close: () =>
            set({
                isOpen: false,
                editingProductId: null,
                editingProduct: null,
                clubId: null,
            }),
    }));