import z from 'zod';

export const signupInput =z.object({
    username:z.string().email(),
    name:z.string(),
    password:z.string().min(5)
})
export type signupInput =z.infer<typeof signupInput>


export const signinInput=z.object({
    username:z.string(),
    password:z.string().min(5)
})
export type signinInput=z.infer<typeof signinInput>


export const createInput=z.object({
    content:z.string().min(1),
    title:z.string().min(1)
})
export type createInput=z.infer<typeof createInput>


export const updateInput=z.object({
    title:z.string(),
    content:z.string(),
    id:z.number()
})

export type updateInput=z.infer<typeof updateInput>
