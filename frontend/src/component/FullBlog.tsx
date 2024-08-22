import { Blog } from "../hooks"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
 
export const FullBlog = ({ blog, user }: { blog: Blog, user: number}) => {
    const navigate = useNavigate();
    console.log(user)
    console.log(blog.authorId)

       const handleDelete = async () => {

        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${blog.id}`,{
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            if(response){
                alert('blog deleted successfully');
            }
            console.log(response.data);

            navigate('/My_blogs'); // Redirect to the blog list after deletion
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };


    return (
        <div>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Post on 2nd December 2023
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                               
                                {user === blog.authorId && (
                                    <button 
                                        onClick={handleDelete}
                                        type="submit" 
                                        className="mt-4 inline-flex items-center px-2 py-1.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-400"
                                    >
                                        DELETE
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}






// import { number } from "zod"
// import { Blog } from "../hooks"
// import axios from "axios"
// import { BACKEND_URL } from "../config"
// import { useNavigate } from "react-router-dom"
// // import { Appbar } from "./Appbar"




// export const FullBlog = ({ blog, user }: { blog: Blog, user: string }) => {

    
// const navigate=useNavigate();
//     return <div>
//         <div className="flex justify-center">
//             <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
//                 <div className="col-span-8">
//                     <div className="text-5xl font-extrabold">
//                         {blog.title}
//                     </div>
//                     <div className="text-slate-500 pt-2">
//                         Post on 2nd December 2023
//                     </div>
//                     <div className="pt-4">
//                         {blog.content}
//                     </div>
//                 </div>
//                 <div className="col-span-4">
//                     <div className="text-slate-600 text-lg">
//                         Author
//                     </div>
//                     <div className="flex w-full">
//                         <div className="pr-4 flex flex-col justify-center">
//                         </div>
//                         <div>
//                             <div className="text-xl font-bold">
//                                 {blog.author.name || "Anonymous"}
//                             </div>

//                             {user === blog.author.name && (
//                                 <button 
//                                 onClick={async () => {
//                                     const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${blog.id}`, {
//                                         headers: {
//                                             Authorization: localStorage.getItem("token")
//                                         }
//                                     });
//                                     console.log(response);
//                                     navigate(`/blog`)
//                                 }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
//                                     DELETE
//                                 </button>
//                                 )}
//                     </div>
//                 </div>
//             </div>

//         </div>
//     </div>
//     </div >
// }
