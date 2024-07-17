import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { BACKEND_URL } from "../config"

export interface Blog{
    "content":string
    "title":string
    "id":number
    "author":{
        "name":string
    }
}

export const useblog=({id}:{id:string})=>{
    const [loading,setloading]=useState(true)
    const [blog,setblog]=useState<Blog>();
    
    useEffect(() => { 
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
    
                setblog(response.data.blog);
                console.log("inside useblog")
                console.log(response)
                 setloading(false);
            })
        }, [id])
    return {
        loading,
        blog
    }
}


export const useblogs=()=>{
    const [loading,setloading]=useState(true)
    const [blogs,setblogs]=useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {

                setblogs(response.data.blogs);
                console.log(response)
                setloading(false);
            })
        }, [])
    return {
        loading,
        blogs
    }
}