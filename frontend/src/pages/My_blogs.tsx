import { useState, useEffect } from 'react';
import { useMyBlogs } from '../hooks';
import { BlogBox } from '../component/BlogBox';
import { Appbar } from '../component/Appbar';
import { Sceleton } from '../component/Sceleton';
import { MyCard } from '../component/My_card';

export const My_blogs = () => {
    const [filter, setFilter] = useState("");
    const { myBlogs, loading } = useMyBlogs();
    const [currentPage, setCurrentPage] = useState(1);

    // Handle filter debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            setFilter(filter);
        }, 300); // Adjust the delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [filter]);

    // Filter blogs
    const filteredBlogs = myBlogs.filter(blog =>
        blog.title.toLowerCase().includes(filter.toLowerCase()) ||
        blog.author.name.toLowerCase().includes(filter.toLowerCase())
    );

    const blogsPerPage = 5;
    const totalBlogs = filteredBlogs.length;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);
    const startPage = (currentPage - 1) * blogsPerPage;
    const endPage = startPage + blogsPerPage;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading && myBlogs.length === 0) {
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

    if (!loading && totalBlogs === 0) {
        return (
            <div className="flex flex-col items-center">
                <Appbar setFilter={setFilter} />
                <MyCard num={totalBlogs} />
                <p className="text-gray-500">No blogs available.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <Appbar setFilter={setFilter} />
            <MyCard num={totalBlogs} />

            <div className="w-3/5 flex flex-col gap-5">
                {filteredBlogs.slice(startPage, endPage).map(blog => (
                    <BlogBox
                        key={blog.id}
                        id={blog.id}
                        del={true}
                        author={blog.author.name || "Anonymous"}
                        image={blog.image}
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
    );
};
