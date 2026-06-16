'use client';

import { useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useProductModalStore } from '@/store/product.store';
import {
    createProductSchema,
    CreateProductFormValues,
} from '@/schemas/product.schema';

import { ImageService } from '@/services/ImageService';
import { ImageType } from "@prisma/client";

import { createProductWithImages, getProductById, updateProductWithImages } from '@/app/actions/productWithImages.action';
import { toast } from 'react-toastify';
import './_productForm.scss';

interface Props {
    clubId: string;
}

export default function ProductForm({
    clubId,
}: Props) {
    const [productImage, setProductImage] = useState<File | null>(null);
    const close = useProductModalStore((state) => state.close);
    const [isPending, startTransition] = useTransition();
    const editingProductId = useProductModalStore(state => state.editingProductId);

    const [imagePreview, setImagePreview] =
        useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            isActive: true,
            stock: 0,
        },
    });

    useEffect(() => {
        const loadProduct = async () => {
            if (!editingProductId) return;

            const product = await getProductById(editingProductId);

            if (!product) return;

            reset({
                name: product.name ?? "",
                description: product.description ?? "",
                isActive: product.isActive,
                price: Number(product.price),
                stock: product.stock ?? 0,
                category: product.category ?? "",
            });

            const productImage = product.images.find(
                image => image.type === ImageType.PRODUCT
            );

            if (productImage) {
                setImagePreview(productImage.url);
            }
        };

        loadProduct();
    }, [editingProductId, reset]);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setProductImage(file);
        setImagePreview(
            URL.createObjectURL(file)
        );
    };

    const onSubmit = async (
        data: CreateProductFormValues
    ) => {
        try {
            let image;

            if (productImage) {
                const res =
                    await ImageService.uploadImage(
                        productImage,
                        {
                            enableOptimization: true,
                            format: 'webp',
                            maxWidth: 1200,
                            maxHeight: 1200,
                        }
                    );

                if (res.success) {
                    image = {
                        url: res.url,
                        publicId: res.public_id,
                        type: ImageType.PRODUCT,
                    };
                }
            }

            if (editingProductId) {
                const res = await updateProductWithImages(editingProductId, data, image);

                if (res.ok) {
                    toast.success('Producto actualizado con éxito');
                    close();
                } else {
                    toast.error('Error al actualizar el producto');
                }
            } else {
                const res = await createProductWithImages({ clubId, data, image });

                if (res.ok) {
                    toast.success('Producto creado con éxito');
                    close();
                } else {
                    toast.error('Error al crear el producto');
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Error al crear el producto');
        }
    };

    return (
        <form
            className="product-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="form-group">
                <label>Nombre</label>

                <input
                    type="text"
                    {...register('name')}
                    placeholder="Camiseta titular 25/26"
                />

                {errors.name && (
                    <span className="error">
                        {errors.name.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label>Descripción</label>

                <textarea
                    {...register('description')}
                    placeholder="Descripción del producto..."
                />
            </div>

            <div className="form-group">
                <label>Categoría</label>

                <input
                    type="text"
                    {...register('category')}
                    placeholder="Camisetas"
                />

                {errors.category && (
                    <span className="error">
                        {errors.category.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label>Precio</label>

                <input
                    type="number"
                    step="0.01"
                    {...register('price', { valueAsNumber: true })}
                    placeholder="49990"
                />

                {errors.price && (
                    <span className="error">
                        {errors.price.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label>Stock</label>

                <input
                    type="number"
                    {...register('stock', { valueAsNumber: true })}
                    placeholder="100"
                />

                {errors.stock && (
                    <span className="error">
                        {errors.stock.message}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label>Imagen</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                {imagePreview && (
                    <Image
                        src={imagePreview}
                        alt="Preview"
                        width={200}
                        height={200}
                    />
                )}
            </div>

            <div className="form-group checkbox-group">
                <label>¿Activo?</label>

                <input
                    type="checkbox"
                    {...register('isActive')}
                />
            </div>

            <div className="form-group button-group">
                <button type="button" className="submit-button cancel-button" onClick={close}>
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="submit-button create-button"
                >
                    {isPending ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </form>
    );
}