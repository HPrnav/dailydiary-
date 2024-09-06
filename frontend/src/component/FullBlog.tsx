import { Blog } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Savebutton } from "./Savebutton";

export const FullBlog = ({ blog, user }: { blog: Blog, user: number }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${blog.id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response) {
                alert('Blog deleted successfully');
            }
            navigate('/My_blogs'); // Redirect to the blog list after deletion
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleReadAloud = () => {
        const speech = new SpeechSynthesisUtterance(blog.content);
        speech.lang = 'en-US';
        speech.rate = 1; // You can adjust the rate of speech
        speech.pitch = 1; // You can adjust the pitch of speech
        window.speechSynthesis.speak(speech);
    };

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel(); // Cancel any ongoing speech when the component unmounts
        };
    }, []);

    return (
        <div className="flex justify-center w-full">
            <div className="bg-white shadow-lg p-6 max-w-screen-md w-full rounded-lg">
                <h1 className="text-5xl font-extrabold">{blog.title}</h1>
                <p className="text-gray-500 pt-2">AUTHOR: {blog.author.name}</p>
                <p className="text-gray-500 pt-2">ACCESS: {blog.access}</p>

                <div className="flex items-start gap-5 text-lg mt-2">
                    <span>{blog.author.name || "Anonymous"}</span>
                    <button
                        onClick={handleReadAloud}
                        className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-800"
                    >
                        Read Aloud
                    </button>
                    <Savebutton id={blog.id} />
                    {user === blog.authorId && (
                        <button
                            onClick={handleDelete}
                            className="text-sm bg-red-700 text-white px-2 py-1 rounded hover:bg-red-400"
                        >
                            DELETE
                        </button>
                    )}
                </div>
                <div className=" flex justify-center">

                <img
                    src={blog.image}
                    alt={blog.title}
                    className=" h-[60vh] object-cover aspect-w-3 aspect-h-4 mt-4 rounded-lg transform hover:scale-105 transition-transform duration-200"
                />
                </div>

                <div className="pt-4 text-lg max-h-[60vh] overflow-auto">
                    {blog.content}
                </div>
            </div>
        </div>
    );
};
