import { z } from "zod";

export const createClubSchema = z.object({
    name: z.string().min(3),
    slug: z.string().min(3),
    description: z.string().optional(),
    foundedAt: z.number().optional(),
    discipline: z.string().optional(),
    socialInstagram: z.string().optional(),
    socialFacebook: z.string().optional(),
    socialTiktok: z.string().optional(),
    website: z.string().optional(),
    isActive: z.boolean(),
    city: z.string(),
});

export type CreateClubFormValues =
    z.input<typeof createClubSchema>;

export type CreateClubDto =
    z.output<typeof createClubSchema>;