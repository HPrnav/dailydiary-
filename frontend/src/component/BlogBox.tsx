import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Savebutton } from "./Savebutton";

interface BlogCardType {
    publishdate: string;
    author: string;
    title: string;
    image: string;
    content: string;
    del: boolean;
    id?: number;
}

export const BlogBox = ({
    publishdate,
    author,
    title,
    content,
    image,
    del,
    id,
}: BlogCardType) => {
    const navigate = useNavigate();
    console.log(image);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response) {
                alert('Blog deleted successfully');
            }
            console.log(response.data);
            navigate('/My_blogs'); // Redirect to the blog list after deletion
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div
            onClick={async () => navigate(`/blog/${id}`)}
            className="p-3 flex flex-col md:flex-row gap-3 border rounded-lg cursor-pointer w-full"
        >
            {/* Image Container */}
            <div className="w-full md:w-2/5">
                <img
                    src={image}
                    alt={"image.."}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Content Container */}
            <div className="flex flex-col justify-between w-full md:w-3/5">
                <div className="flex flex-row items-start md:items-center gap-3 font-semibold text-gray-500 font-mono">
                    <Avatar author={author} />
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                        <div className="flex flex-row">
                            <div className="text-lg">{author}</div>
                            <svg
                                className="h-5 w-5 text-lime-500 md:mx-2" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx="5" cy="12" r="1" />
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                            </svg>
                        </div>
                        <div className="text-opacity-30 font-sans">{publishdate}</div>
                    </div>
                </div>

                <div className="mt-2">
                    <div className="text-xl font-bold font-serif">{title}</div>
                    <div className="text-slate-600">{content.slice(0, 100) + "..."}</div>
                </div>

                <div className="flex items-center text-sm pt-5">
                    <svg
                        className="h-4 w-4 text-lime-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>{Math.floor(content.length / 50) === 0 ? "1" : Math.floor(content.length / 50)} minute read</div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-2 mt-2">
                    <button
                        onClick={async () => navigate(`/blog/${id}`)}
                        className="px-1 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-800"
                    >
                        READ ALOUD
                    </button>
                    <Savebutton id={id? id:0}></Savebutton>

                    {del && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the click from propagating to the parent div
                                if (id) handleDelete(id); // Pass the id to the handleDelete function
                            }}
                            className="px-1 py-1 bg-red-700 text-white text-sm rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const Avatar = ({ author }: { author: string }) => {
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
                {author.slice(0, 2).toUpperCase()}
            </span>
        </div>
    );
};
