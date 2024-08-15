import { BlogBox } from "../component/BlogBox";
import { Appbar } from "../component/Appbar";
import { useblogs } from "../hooks";
import { Sceleton } from "../component/Sceleton";
import { useState } from "react";
 import { useEffect } from "react";

export const Blogs = () => {
    const blogsPerPage = 5;
    const { loading, blogs } = useblogs();
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilter(filter);
        }, 1000); // Adjust the delay as needed

        // Cleanup the timeout if the effect is re-run
        return () => {
            clearTimeout(handler);
        };
    }, [filter]);

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(filter.toLowerCase()) ||
        blog.author.name.toLowerCase().includes(filter.toLowerCase())
    );

    const totalBlogs = blogs.length;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);

    const startPage = (currentPage - 1) * blogsPerPage;
    const endPage = startPage + blogsPerPage;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-12 ">
                <Sceleton />
                <Sceleton />
                <Sceleton />
                <Sceleton />
                <Sceleton />
                <Sceleton />
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <Appbar setFilter={setFilter} />
                <div className="w-3/5 flex flex-col gap-5">
                    {filteredBlogs.slice(startPage, endPage).map(blog => (
                        <BlogBox
                            key={blog.id}
                            id={blog.id}
                            author={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishdate={"2nd Feb 2024"}
                        />
                    ))}
                </div>

                <ul className="flex justify-center gap-2 mt-5">
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 rounded ${
                                    currentPage === index + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
