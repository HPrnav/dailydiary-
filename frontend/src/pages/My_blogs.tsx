import  { useState, useEffect } from 'react';
import { useMyBlogs } from '../hooks';
import { BlogBox } from '../component/BlogBox';
import { Appbar } from '../component/Appbar';
import { Sceleton } from '../component/Sceleton';
import {MyCard} from '../component/My_card';


export const My_blogs = () => {
    const [filter, setFilter] = useState("");
     const {myBlogs,loading} = useMyBlogs();
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
    // const currentPage = 1; // Manage page state if needed
    const totalBlogs = filteredBlogs.length;
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
        <div className="flex flex-col items-center">
            <Appbar setFilter={setFilter} />
            <MyCard num={totalBlogs} ></MyCard>

            <div className="w-3/5 flex flex-col gap-5">
                {filteredBlogs.slice(startPage, endPage).map(blog => (
                    <BlogBox
                        key={blog.id}
                        id={blog.id}
                        del={true}
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
    );
};

 
// {/* <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Better Data</span> Scalable AI.</h1>
//     <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> */}
//     // 
// import { useState } from 'react';
// import { useMyBlogs } from '../hooks';
// import { BlogBox } from '../component/BlogBox';
// import { Sceleton } from '../component/Sceleton';

// export const My_blogs = () => {
//     const { myBlogs, loading } = useMyBlogs();
//     const [currentPage, setCurrentPage] = useState(1);

//     const blogsPerPage = 5;
//     const totalBlogs = myBlogs.length;
//     const totalPages = Math.ceil(totalBlogs / blogsPerPage);
//     const startPage = (currentPage - 1) * blogsPerPage;
//     const endPage = startPage + blogsPerPage;

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     if (loading) {
//         return (
//             <div className="flex flex-col gap-12">
//                 <Sceleton />
//                 <Sceleton />
//                 <Sceleton />
//                 <Sceleton />
//                 <Sceleton />
//             </div>
//         );
//     }

//     return (
//         <div className="flex flex-col items-center">
//             <div className="w-3/5 flex flex-col gap-5">
//                 {myBlogs.slice(startPage, endPage).map(blog => (
//                     <BlogBox
//                         key={blog.id}
//                         id={blog.id}
//                         author={blog.author.name || "Anonymous"}
//                         title={blog.title}
//                         content={blog.content}
//                         publishdate={"2nd Feb 2024"} // Placeholder date
//                     />
//                 ))}
//             </div>

//             <ul className="flex justify-center gap-2 mt-5">
//                 {[...Array(totalPages)].map((_, index) => (
//                     <li key={index}>
//                         <button
//                             onClick={() => handlePageChange(index + 1)}
//                             className={`px-4 py-2 rounded ${
//                                 currentPage === index + 1
//                                     ? "bg-blue-500 text-white"
//                                     : "bg-gray-200 text-black"
//                             }`}
//                         >
//                             {index + 1}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
