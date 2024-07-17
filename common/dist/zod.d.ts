import z from 'zod';
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    name: string;
    password: string;
}, {
    username: string;
    name: string;
    password: string;
}>;
export type signupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type signinInput = z.infer<typeof signinInput>;
export declare const createInput: z.ZodObject<{
    content: z.ZodString;
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    title: string;
}, {
    content: string;
    title: string;
}>;
export type createInput = z.infer<typeof createInput>;
export declare const updateInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    content: string;
    title: string;
    id: number;
}, {
    content: string;
    title: string;
    id: number;
}>;
export type updateInput = z.infer<typeof updateInput>;
