import { z } from "zod";

export const TodoSchema = z.object({
    title: z.string(),
    status: z.boolean().default(false).optional(),
});

export type TodoFormType = z.infer<typeof TodoSchema>;

export type todoType = {
    id: number
    title: string
    status: boolean
}