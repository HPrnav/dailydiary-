import { Hono } from 'hono'
import { sign} from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {signupInput,SigninInput, signinInput} from '@100xdevs/medium-common'

export const userRoute=new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string
      }
}>()

userRoute.post('/signup', async(c) => {
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body= await c.req.json();
    const {success}=signupInput.safeParse(body);
    
    if(success){
      try {
        const user= await prisma.user.create({
          data:{
            username:body.username,
            password:body.password,
            name:body.name
          }
        })
        const jwt =await sign({
          id: user.id
        },c.env.JWT_SECRET)
      
        return c.json({jwt:jwt});
      } catch (e) {
        console.log
        return c.text('INVALID'+e);
      }
    }
    else{
        c.status(411);
        return c.text("invalid signup credintial");
    }
})  

userRoute.post('/signin', async (c) => {

    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body= await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(success){

      try {
        const user= await prisma.user.findFirst({
          where:{
            username:body.username,
            password:body.password,
          }
        })
  
        if(!user){
        c.status(403);
        return c.text("signin un-successful")
        }
  
        const jwt =await sign({
          id: user.id
        },c.env.JWT_SECRET)
      
        return c.json({jwt:jwt});
      } catch (e) {
        
        return c.text('INVALID'+e);
      }
    }
    else{
      c.status(411);
      return c.text("invalid signin credintial");
    }

})

 