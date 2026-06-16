'use server';

import { ImageType } from "@prisma/client";
import { deleteCloudinaryImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { CreateClubDto } from "@/schemas/club.schema";
import { revalidatePath } from "next/cache";

type UploadedImage = {
    url: string;
    publicId: string;
    type: ImageType;
};

export async function createClubWithImages(
    data: CreateClubDto,
    images: {
        logo?: UploadedImage;
        banner?: UploadedImage;
    }
) {
    const club = await prisma.club.create({
        data: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            foundedAt: data.foundedAt,
            discipline: data.discipline,
            isActive: data.isActive,
            socialInstagram: data.socialInstagram,
            socialFacebook: data.socialFacebook,
            socialTiktok: data.socialTiktok,
            socialWebsite: data.website,
            city: data.city,
        },
    });

    const imageCreates = [];

    if (images.logo) {
        imageCreates.push(
            prisma.image.create({
                data: {
                    url: images.logo.url || '/logo.jpg',
                    publicId: images.logo.publicId,
                    type: ImageType.LOGO,
                    clubId: club.id,
                },
            })
        );
    }

    if (images.banner) {
        imageCreates.push(
            prisma.image.create({
                data: {
                    url: images.banner.url || '/banner.jpg',
                    publicId: images.banner.publicId,
                    type: ImageType.BANNER,
                    clubId: club.id,
                },
            })
        );
    }

    await Promise.all(imageCreates);
    revalidatePath("/admin");
    return {
        ok: true,
        club
    };
}

export async function updateClubWithImages(
    clubId: string,
    data: CreateClubDto,
    images: {
        logo?: UploadedImage;
        banner?: UploadedImage;
    }
) {
    return prisma.$transaction(async (tx) => {
        const club = await tx.club.update({
            where: {
                id: clubId,
            },
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                foundedAt: data.foundedAt,
                discipline: data.discipline,
                isActive: data.isActive,
                socialInstagram: data.socialInstagram,
                socialFacebook: data.socialFacebook,
                socialTiktok: data.socialTiktok,
                socialWebsite: data.website,
                city: data.city,
            },
        });

        if (images.logo) {
            const currentLogo = await tx.image.findFirst({
                where: {
                    clubId,
                    type: ImageType.LOGO,
                },
            });

            if (currentLogo) {
                await deleteCloudinaryImage(
                    currentLogo.publicId
                );
            }

            await tx.image.deleteMany({
                where: {
                    clubId,
                    type: ImageType.LOGO,
                },
            });

            await tx.image.create({
                data: {
                    url: images.logo.url || '/logo.jpg',
                    publicId: images.logo.publicId,
                    type: ImageType.LOGO,
                    clubId,
                },
            });
        }

        if (images.banner) {
            const currentBanner = await tx.image.findFirst({
                where: {
                    clubId,
                    type: ImageType.BANNER,
                },
            });

            if (currentBanner) {
                await deleteCloudinaryImage(
                    currentBanner.publicId
                );
            }

            await tx.image.deleteMany({
                where: {
                    clubId,
                    type: ImageType.BANNER,
                },
            });

            await tx.image.create({
                data: {
                    url: images.banner.url || '/banner.jpg',
                    publicId: images.banner.publicId,
                    type: ImageType.BANNER,
                    clubId,
                },
            });
        }
        revalidatePath("/admin");

        return {
            ok: true,
            club
        };
    });
}

export async function deleteClubWithImages(
    clubId: string
) {
    return prisma.$transaction(async (tx) => {
        // Imágenes del club + imágenes de productos del club
        const images = await tx.image.findMany({
            where: {
                OR: [
                    {
                        clubId,
                    },
                    {
                        product: {
                            clubId,
                        },
                    },
                ],
            },
        });

        // Eliminar de Cloudinary
        for (const image of images) {
            await deleteCloudinaryImage(
                image.publicId
            );
        }

        // Eliminar club
        // Prisma borrará automáticamente:
        // - productos
        // - imágenes
        // gracias al onDelete: Cascade
        await tx.club.delete({
            where: {
                id: clubId,
            },
        });

        revalidatePath("/admin");

        return {
            ok: true,
        };
    });
}