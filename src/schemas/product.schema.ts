import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),

    price: z.number().positive(),

    category: z.string().min(2),

    stock: z.number().min(0),

    isActive: z.boolean(),
});

export type CreateProductFormValues =
    z.input<typeof createProductSchema>;

export type CreateProductDto =
    z.output<typeof createProductSchema>;