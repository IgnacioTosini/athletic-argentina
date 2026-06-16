"use client";

import { useProductModalStore } from "@/store/product.store";
import ProductForm from "../productForm/ProductForm";
import "./_productModal.scss";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({
    isOpen,
    onClose,
}: Props) {
    const editingProductId = useProductModalStore((state) => state.editingProductId);
    const clubId = useProductModalStore((state) => state.clubId);
    if (!isOpen) return null;

    return (
        <>
            <div
                className="modal-backdrop"
                onClick={onClose}
            />

            <aside className="product-modal">
                <header className="product-modal-header">
                    <h2 className="product-modal-title">{editingProductId ? "Editar Producto" : "Nuevo Producto"}</h2>
                    <button onClick={onClose} className="product-modal-close-button">
                        ✕
                    </button>
                </header>

                <ProductForm clubId={clubId || ""} />
            </aside>
        </>
    );
}