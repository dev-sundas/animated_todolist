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

export const LoginFormSchema = z.object({
    email: z.string(),
    password: z.string(),
    remember: z.boolean().default(false).optional(),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z.object({
    username: z.string(),
    email:z.string(),
    password: z.string(),
    confirmPassword:z.string(),
    remember: z.boolean().default(false).optional(),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;