import { Club, Image, Product } from '@prisma/client';

export type ProductWithImages = Product & {
    images: Image[];
};

export type ClubWithImages = Club & {
    images: Image[];
    products: ProductWithImages[];
};