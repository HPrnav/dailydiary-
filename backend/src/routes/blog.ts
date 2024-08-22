import { Hono } from 'hono'
import { decode,sign,verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
 import { createBlogInput,updateBlogInput } from '@100xdevs/medium-common'
import { number } from 'zod'

export const blogRoute = new Hono<{
  Bindings:{
    DATABASE_URL:string; 
    JWT_SECRET:string;
  },
  Variables:{
    userid:  any;
  }
}>()

blogRoute.get('/', async(c) => {
    // const body=await c.req.json();
    // console.log(body);
    // const hdr=c.req.header("Authorization")
    // const parma=c.req.query("param")
    // return c.text(`body's id :` +body.id+`___header`+hdr +`__query-paramerter:`+parma);
    return c.text(`body` );
  })

blogRoute.use('/*', async(c,next)=>{
    const authheader= c.req.header("Authorization")||"";
     const  user=  await verify(authheader,c.env.JWT_SECRET);
     if(user){
        c.set("userid",user.id)
        await next();
     }
     else{
        return c.json({
            msg:"you are not logged in"
        })
     }
 })

blogRoute.post('/',async(c)=>{
    const authorid=c.get('userid');
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body=await c.req.json();
    const success=createBlogInput.safeParse(body);
    if(success){
        const  blog=await prisma.blog.create({
          data:{
              title:body.title,
              content:body.content,
              authorId:Number(authorid)
          }
        })
    
      return c.json({id:blog.id});

    }else{
        c.status(411);
        return c.text("invalid input while creatingblog")
    }
    
    
});
 

blogRoute.put('/',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body=await c.req.json();
    const success=updateBlogInput.safeParse(body);
    if(success){

        try {
            const  blog=await prisma.blog.update({
            where:{
                id:body.id
            },
            data:{
                title:body.title,
                content:body.content
            }
            }) 
            return c.text("blog updated id:"+blog.id);
            
        } catch (error) {
            return c.text('error');
        }

    }
    else{
        c.status(411);
        return c.text("error while updating the blog")

    }
});

blogRoute.get('/bulk',async(c)=>{

    try {
         const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
          }).$extends(withAccelerate())
        const blogs= await prisma.blog.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({blogs});
    }    
    catch (error) {
        return c.text('error:error in /bulk'+ error);
    }

});

blogRoute.get('/:id',async(c)=>{
    const id=c.req.param("id");
     const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())


    try {
        const  blog=await prisma.blog.findFirst({
        where:{
            id:Number(id)
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            },
            authorId:true
        }
        }) 
        return c.json({blog});
        
    } catch (error) {
        return c.text(''+error);
    }

});


blogRoute.get('/my/:author_id',async(c)=>{
    const id=c.req.param("author_id");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    try {
        const  blog=await prisma.blog.findMany({
        where:{
            authorId:Number(id)
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
        }) 
        return c.json({blog});

    } catch (error) {
        return c.text('inside the blog in backend'+error);
    }
});


blogRoute.delete('/delete/:del_id',async(c)=>{
    const delId=c.req.param("del_id");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      try {

        const del_blog= await prisma.blog.delete({
            where:{
                id:Number(delId)
            }
        })
        return c.json({del_blog});
      } catch (error) {
        console.log("error while deleting blog");
      }
})




// blogRoute.get('/:filter', async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate());

//     // Get the filter word from the query parameters
//     const filterWord = c.req.param('filter') || '';

//     try {
//         // Find blog posts that contain the filter word in their title or content
//         const blogs = await prisma.blog.findMany({
//             where: {
//                 OR: [
//                     {
//                         title: {
//                             contains: filterWord,
//                             mode: 'insensitive', // Make search case insensitive
//                         }
//                     },
//                     {
//                         content: {
//                             contains: filterWord,
//                             mode: 'insensitive',
//                         }
//                     }
//                 ]
//             },
//             select: {
//                 id: true,
//                 title: true,
//                 content: true,
//                 author: {
//                     select: {
//                         name: true
//                     }
//                 }
//             }
//         });

//         return c.json({ blogs });
//     } catch (error) {
//         return c.text('Error: ' + error);
//     }
// });






