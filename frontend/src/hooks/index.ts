import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { BACKEND_URL } from "../config"

export interface Blog{
    "content":string
    "title":string
    "id":number
    "image":string
    "access":string
    "author":{
        "name":string
    }
    "authorId":  number
}

export const useblog=({id}:{id:string})=>{
    const [loading,setloading]=useState(true)
    const [blog,setblog]=useState<Blog>();
    
    useEffect(() => { 
        axios.get(`${BACKEND_URL}/api/v1/blog/get_one/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
    
                setblog(response.data.blog);
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
                console.log("printing in use blogs:")
                console.log(response)
                setloading(false);
            })
        }, [])
    return {
        loading,
        blogs
    }
}
export const useMyBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [myBlogs, setMyBlogs] = useState<Blog[]>([]);


    function parseJWT(token: string): any | null {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error("Invalid JWT", e);
        return null;
      }
    }
  
    useEffect(() => { 
      const fetchBlogs = async (userId: string) => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/blog/my/${userId}`, {
            headers: {
              Authorization: localStorage.getItem("token") || ''
            }
          });
          console.log(response.data.blog)
          setMyBlogs(response.data.blog);
        } catch (error) {
          console.error("Error fetching blogs", error);
        } finally {
          setLoading(false);
        }
      };
  
      const token = localStorage.getItem('token');
      if (token) {
        const user = parseJWT(token);
         if (user && user.id) {
          fetchBlogs(user.id);
        } else {
          console.error("User ID not found in token");
          setLoading(false);
        }
      } else {
        console.error("Token not found");
        setLoading(false);
      }
    }, []);
  
    return {
      loading,
      myBlogs
    };
  };




