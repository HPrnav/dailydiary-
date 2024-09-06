import axios from "axios"; // Import Axios
import { useState ,useEffect} from "react";
import { Appbar } from "../component/Appbar";
import { Sceleton } from "../component/Sceleton";
import { useSavedBlogs } from "../hooks/index.ts"; // Import the custom hook
import { BACKEND_URL } from "../config";

export const SavedBlogs = () => {
    const { savedBlogIds, loading: loadingSavedBlogs, error } = useSavedBlogs();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);

    useEffect(() => {
        if (savedBlogIds.length > 0) {
            const fetchBlogs = async () => {
                try {
                    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    });
                    setBlogs(response.data.blogs);
                    setLoadingBlogs(false);
                } catch (error) {
                    console.error("Error fetching blogs:", error);
                    setLoadingBlogs(false);
                }
            };

            fetchBlogs();
        }
    }, [savedBlogIds]);

    if (loadingSavedBlogs || loadingBlogs) {
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
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <Appbar setFilter={() => {}} />
            <div className="w-3/4 flex flex-wrap gap-6 justify-center">
                {savedBlogIds.length > 0 &&
                    blogs.map((blog:any) =>
                        savedBlogIds.includes(blog.id) ? (
                            <div key={blog.id} className="bg-gray-200 shadow-lg rounded-lg p-6 w-full sm:w-80">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                                <p className="text-gray-600 mb-2">by {blog.author?.name || "Anonymous"}</p>
                                <p className="text-gray-800">
                                    {blog.content.length > 40 ? `${blog.content.substring(0, 40)}...` : blog.content}
                                </p>
                            </div>
                        ) : null
                    )}
            </div>
        </div>
    );
};