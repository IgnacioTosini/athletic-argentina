'use client';

import Image from 'next/image';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

import { Title } from '@/components/shared/Title/Title';
import { useProductModalStore } from '@/store/product.store';
import { deleteProductWithImages } from '@/app/actions/productWithImages.action';

import { ProductWithImages } from '@/types';

import './_productManager.scss';

interface Props {
    products: ProductWithImages[];
    clubId: string;
}

export const ProductManager = ({
    products,
    clubId,
}: Props) => {
    const openCreate = useProductModalStore((state) => state.openCreate);

    const openEdit =
        useProductModalStore(
            state => state.openEdit
        );

    const onDelete = async (
        productId: string
    ) => {
        const res =
            await deleteProductWithImages(
                productId
            );

        if (!res.ok) {
            toast.error(
                'Error al eliminar el producto'
            );
            return;
        }

        toast.success(
            'Producto eliminado correctamente'
        );
    };

    return (
        <div className="product-manager">
            <div className="product-manager-header">
                <div className="product-manager-title">
                    <Title
                        title="Gestión"
                        subTitle="Productos"
                    />

                    <p className="product-manager-description">
                        Administrá el catálogo del club.
                    </p>
                </div>
                <button onClick={() => openCreate(clubId)} className="new-product-button">+ Agregar Producto</button>
            </div>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => {
                        const image =
                            product.images.find(
                                img =>
                                    img.type ===
                                    'PRODUCT'
                            );

                        return (
                            <tr
                                key={product.id}
                                className="product-row"
                            >
                                <td>
                                    <Image
                                        src={
                                            image?.url ??
                                            '/images/product-placeholder.webp'
                                        }
                                        alt={
                                            product.name
                                        }
                                        width={50}
                                        height={50}
                                        className="product-image"
                                    />
                                </td>

                                <td>
                                    {
                                        product.name
                                    }
                                </td>

                                <td>
                                    {
                                        product.category
                                    }
                                </td>

                                <td>
                                    $
                                    {Number(
                                        product.price
                                    ).toLocaleString(
                                        'es-AR'
                                    )}
                                </td>

                                <td>
                                    {product.stock ??
                                        0}
                                </td>

                                <td>
                                    <span
                                        className={
                                            product.isActive
                                                ? 'status-badge status-active'
                                                : 'status-badge status-draft'
                                        }
                                    >
                                        {product.isActive
                                            ? 'Activo'
                                            : 'Inactivo'}
                                    </span>
                                </td>

                                <td>
                                    <div className="actions">
                                        <button
                                            onClick={() =>
                                                openEdit(
                                                    product
                                                )
                                            }
                                        >
                                            <Pencil
                                                size={
                                                    16
                                                }
                                            />
                                        </button>

                                        <button
                                            onClick={() =>
                                                onDelete(
                                                    product.id
                                                )
                                            }
                                        >
                                            <Trash2
                                                size={
                                                    16
                                                }
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};