'use server';

import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/serializePrisma";
import { CreateClubDto } from "@/schemas/club.schema";

export async function getClubs() {
    const clubs = await prisma.club.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            images: true,
            products: {
                include: {
                    images: true,
                },
            },
        },
    });

    return serializePrisma(clubs);
}

export async function getClubById(id: string) {
    const club = await prisma.club.findUnique({
        where: {
            id,
        },
        include: {
            images: true,
            products: {
                include: {
                    images: true,
                },
            },
        },
    });

    return serializePrisma(club);
}

export async function getClubBySlug(slug: string) {
    const club = await prisma.club.findUnique({
        where: {
            slug,
        },
        include: {
            images: true,
            products: {
                include: {
                    images: true,
                },
            },
        },
    });

    return serializePrisma(club);
}

export async function createClub(data: CreateClubDto) {
    return prisma.club.create({
        data,
    });
}

export async function updateClub(
    id: string,
    data: CreateClubDto
) {
    const existingClub = await prisma.club.findUnique({
        where: {
            id,
        },
    });
    if (!existingClub) {
        throw new Error("Club not found");
    }

    const club = await prisma.club.update({
        where: {
            id,
        },
        data,
    });

    return {
        ok: true,
        club,
    }
}

export async function deleteClub(id: string) {
    return prisma.club.delete({
        where: {
            id,
        },
        include: {
            images: true,
            products: {
                include: {
                    images: true,
                },
            },
        },
    });
}