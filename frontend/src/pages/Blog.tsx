 import {useblog} from "../hooks"
import { useParams } from "react-router-dom";
import { FullBlog } from "../component/FullBlog";
import { Sceleton } from "../component/Sceleton";

export const Blog=()=>{
    const {id}=useParams();
    const {loading,blog}=useblog(
        {
            id:id||""
        }
    );
     if (loading){
        return<div className="flex flex-col gap-12">
            <Sceleton/>
            <Sceleton/>
            <Sceleton/>
            <Sceleton/>
            <Sceleton/>
            <Sceleton/>
        </div>
    }
    
        //@ts-ignore
    return <div >
        <FullBlog blog={blog}/>
        
    </div>

}