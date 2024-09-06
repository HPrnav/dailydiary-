import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface AppbarProps {
    setFilter?: (value: string) => void;
}

export const Appbar: React.FC<AppbarProps> = ({ setFilter }) => {
    const location = useLocation();
    const showSearchBar = location.pathname === '/My_blogs' || location.pathname === '/blogs';

    // Toggle mobile menu
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Check if the current page is the homepage
    const Page = location.pathname ;

    return (
        <div className="bg-white border-b-4 border-gray-200 shadow-md w-full">
            <div className="flex justify-between px-4 py-2 md:px-10 md:py-4 w-full items-center">
                <Link to={'/blogs'} className="text-xl font-serif font-bold text-gray-800">Tale-Pod</Link>
                <button className="md:hidden p-2 text-gray-600 focus:outline-none" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>
                <div className="hidden md:flex flex-grow items-center justify-center">
                    {showSearchBar && setFilter && (
                        <form className="relative w-full max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5a7 7 0 0114 0v0a7 7 0 01-14 0v0z"/>
                                </svg>
                            </div>
                            <input onChange={(e) => setFilter?.(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search story / category" required />
                        </form>
                    )}
                </div>
                <div className="hidden md:flex gap-4">
                    <Link to={'/blogs'}>
                        <button
                            type="button"
                            className={`${
                                Page ==='/blogs' ? "bg-yellow-500 text-black" : "bg-green-700 text-white"
                            } hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5`}
                        >
                            HOME
                        </button>
                    </Link>
                    <Link to={`/Saved_blog`}>
                        <button type="button" 
                        className={`${Page==='/Saved_blog'? "bg-yellow-500 text-black" : "bg-green-700 text-white" } hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5`}>Saved</button>
                        
                    </Link>
                    <Link to={`/My_blogs`}>
                        <button type="button" 
                        className= {`${Page==='/My_blogs'? "bg-yellow-500 text-black" : "bg-green-700 text-white"} hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5`}>My Blogs</button>
                    </Link>
                    <Link to={`/publish`}>
                        <button type="button" 
                        className={`${Page==='/publish'? "bg-yellow-500 text-black" :"bg-green-700 text-white"} hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5`}>Publish</button>
                    </Link>
                </div>
            </div>
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                {showSearchBar && setFilter && (
                    <div className="p-4">
                        <form className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5a7 7 0 0114 0v0a7 7 0 01-14 0v0z"/>
                                </svg>
                            </div>
                            <input onChange={(e) => setFilter?.(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search blog here" required />
                        </form>
                    </div>
                )}
                <div className="flex flex-col gap-4 p-4">
                    <Link to={`/My_blogs`}>
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 w-full">My Blogs</button>
                    </Link>
                    <Link to={`/publish`}>
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 w-full">Publish</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
