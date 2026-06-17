'use server';

import { ImageType } from "@prisma/client";
import { deleteCloudinaryImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateProductDto } from "@/schemas/product.schema";
import { serializePrisma } from "@/lib/serializePrisma";

type UploadedImage = {
    url: string;
    publicId: string;
    type: ImageType;
};

export async function createProductWithImages({
    clubId,
    data,
    image,
}: {
    clubId: string;
    data: CreateProductDto;
    image?: UploadedImage;
}) {
    const product = await prisma.product.create({
        data: {
            clubId,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            stock: data.stock,
            isActive: data.isActive,
        },
    });

    if (image) {
        await prisma.image.create({
            data: {
                url: image.url || '/t-shirt.jpg',
                publicId: image.publicId,
                type: ImageType.PRODUCT,
                productId: product.id,
            },
        });
    }

    revalidatePath("/admin");
    revalidatePath("/");

    return {
        ok: true,
        product: serializePrisma(product),
    };
}

export async function updateProductWithImages(
    productId: string,
    data: CreateProductDto,
    image?: UploadedImage
) {
    return prisma.$transaction(async (tx) => {
        const product = await tx.product.update({
            where: {
                id: productId,
            },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category,
                stock: data.stock,
                isActive: data.isActive,
            },
        });

        if (image) {
            const currentImage =
                await tx.image.findFirst({
                    where: {
                        productId,
                        type: ImageType.PRODUCT,
                    },
                });

            if (currentImage) {
                await deleteCloudinaryImage(
                    currentImage.publicId
                );
            }

            await tx.image.deleteMany({
                where: {
                    productId,
                    type: ImageType.PRODUCT,
                },
            });

            await tx.image.create({
                data: {
                    url: image.url || '/t-shirt.jpg',
                    publicId: image.publicId,
                    type: ImageType.PRODUCT,
                    productId,
                },
            });
        }

        revalidatePath("/admin");
        revalidatePath("/");

        return {
            ok: true,
            product: serializePrisma(product),
        };
    });
}

export async function deleteProductWithImages(
    productId: string
) {
    return prisma.$transaction(async (tx) => {
        const images = await tx.image.findMany({
            where: {
                productId,
            },
        });

        for (const image of images) {
            await deleteCloudinaryImage(
                image.publicId
            );
        }

        await tx.image.deleteMany({
            where: {
                productId,
            },
        });

        await tx.product.delete({
            where: {
                id: productId,
            },
        });

        revalidatePath("/admin");
        revalidatePath("/");

        return {
            ok: true,
        };
    });
}

export const getProductById = async (
    productId: string
) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
        include: {
            images: true,
        },
    });

    return serializePrisma(product);
};