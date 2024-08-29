import { useblog } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../component/FullBlog";
import { Sceleton } from "../component/Sceleton";
import { useState, useEffect } from "react";
import { Appbar } from "../component/Appbar";

export const Blog = () => {
    const { id } = useParams();
    const [user, setUser] = useState(1);
    const { loading, blog } = useblog({ id: id || "" });

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
        const token = localStorage.getItem('token');
        if (token) {
            const parsedUser = parseJWT(token);
            if (parsedUser && parsedUser.id) {
                  setUser(parsedUser.id);  // Assuming `name` is the property you need
            } else {
                console.error("Failed to parse user from token");
            }
        }
    }, []); // Empty dependency array ensures this only runs once on mount

    if (loading || !blog) {
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

    return (
        <div>
            <Appbar></Appbar>
            <FullBlog blog={blog} user={user} />
        </div>
    );
}
