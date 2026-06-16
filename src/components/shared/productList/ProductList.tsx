'use client';

import { ProductWithImages } from '@/types';
import Image from 'next/image';
import { useCartStore } from '@/store/cart.store';
import './_productList.scss';

interface Props {
    products: ProductWithImages[];
    demo?: boolean;
    name?: string;
    slug?: string;
}

export const ProductList = ({ products, demo, name, slug }: Props) => {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <div className="product-list-container">
            {products.length === 0 ?
                <div className="empty-state">
                    <p className="empty-state-text">No hay productos disponibles.</p>
                </div>
                :
                <div className="demo-section-content">
                    {demo && (
                        <div className="demo-section-info">
                            <div className="demo-section-url-container">
                                <span className='circle'></span>
                                <span className='circle'></span>
                                <span className='circle'></span>
                                <p className="demo-section-url">athletic.com/clubes/{slug}</p>
                            </div>
                            <p className="demo-section-club-name">Tienda oficial · {name}</p>
                        </div>
                    )}
                    <div className={"demo-section-products"}>
                        {
                            products.map((product) => (
                                <div key={product.id} className={"demo-section-product"}>
                                    <div className={"demo-section-product-image-wrapper"}>
                                        <Image
                                            src={product.images[0]?.url || '/banner2.jpg'}
                                            fill
                                            alt={product.name}
                                            className={"demo-section-image"}
                                        />
                                    </div>

                                    <div className={"demo-section-product-info"}>
                                        <span className={"demo-section-product-badge"}>
                                            Oficial
                                        </span>

                                        <h3 className={"demo-section-product-name"}>
                                            {product.name}
                                        </h3>

                                        <div className={"demo-section-product-details"}>
                                            <p className={"demo-section-product-price"}>
                                                {Number(product.price).toLocaleString(
                                                    'es-AR',
                                                    {
                                                        style: 'currency',
                                                        currency: 'ARS',
                                                    }
                                                )}
                                            </p>
                                            {
                                                !demo && (
                                                    <button
                                                        className="club-shop-product-button"
                                                        onClick={() =>
                                                            addItem({
                                                                productId: product.id,
                                                                clubId: product.clubId,
                                                                name: product.name,
                                                                image:
                                                                    product.images[0]?.url ||
                                                                    "/banner2.jpg",
                                                                price: Number(product.price),
                                                                quantity: 1,
                                                            })
                                                        }
                                                    >
                                                        Agregar +
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}
