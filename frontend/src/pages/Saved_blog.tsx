import { useState, useEffect } from "react";
import axios from 'axios'; // Import Axios
import { Appbar } from "../component/Appbar";
import { Sceleton } from "../component/Sceleton";
// import { BlogBox } from "../component/BlogBox";

export const SavedBlogs = () => {
    const [savedBlogIds, setSavedBlogIds] = useState<number[]>([]);
    const [blogs, setBlogs] = useState<any[]>([]); // Adjust the type as needed
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSavedBlogs = async () => {
            try {
                // Fetch saved blog IDs
                const savedBlogsResponse = await axios.get("/save/savedBlogs", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const { success, savedBlogIds } = savedBlogsResponse.data;
                if (success) {
                    setSavedBlogIds(savedBlogIds);
                }

                // Fetch all blogs
                const blogsResponse = await axios.get("/api/v1/blogs", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBlogs(blogsResponse.data.blogs);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }
        };

        fetchSavedBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-12">
                <Sceleton />
                <Sceleton />
                <Sceleton />
                <Sceleton />
                <Sceleton />
                <Sceleton />
            </div>
        );
    }

    // Display blogs in a beautiful card format
    return (
        <>
            <div className="flex flex-col items-center">
                <Appbar setFilter={() => {}} /> {/* Pass a no-op function since filter is not used */}
                <div className="w-3/4 flex flex-wrap gap-6 justify-center">
                    { savedBlogIds.length>0  && blogs.map(blog => 
                        savedBlogIds.includes(blog.id) && (
                            <div key={blog.id} className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-80">
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-t-lg mb-4"/>
                                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                                <p className="text-gray-600 mb-2">by {blog.author?.name || "Anonymous"}</p>
                                <p className="text-gray-800">{blog.content}</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
};
