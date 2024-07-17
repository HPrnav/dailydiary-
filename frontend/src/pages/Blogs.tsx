import { BlogBox } from "../component/BlogBox"
import { Appbar} from "../component/Appbar"
import { useblogs } from "../hooks"
import { Sceleton } from "../component/Sceleton"

export const Blogs=()=>{
    const {loading,blogs}= useblogs();

    if(loading){
        return<div className="flex flex-col gap-12 ">
             <Sceleton/> 
             <Sceleton/> 
             <Sceleton/> 
             <Sceleton/> 
             <Sceleton/> 
             <Sceleton/> 
        </div>
    }

    return<>
    <div className="flex flex-col items-center">
        <Appbar></Appbar>       
        <div className="w-3/5 flex flex-col gap-5">
        {blogs.map(blog=><BlogBox key={blog.id}
             id={blog.id}
             author={blog.author.name || "Anonymous"}
             title={blog.title}
             content={blog.content}
             publishdate={"2nd Feb 2024"}
            />)}
        </div>

 </div>
    </>

}