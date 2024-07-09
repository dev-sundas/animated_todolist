import { z } from "zod";

export const TodoSchema = z.object({
    title: z.string(),
});

export type TodoFormType = z.infer<typeof TodoSchema>;

export type todoType = {
    id: number
    title: string
    status: boolean
}