import React from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

interface SavebuttonProps {
    id: number;
 
}

export const Savebutton: React.FC<SavebuttonProps> = ({ id }) => {
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/blog/save/${id}`, {},{
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

             navigate(`/saved_blog`);
        } catch (error) {
            console.error("Error saving blog:", error);
        }
    };

    return (
        <button onClick={handleSave} className="text-sm bg-orange-500 text-white px-3 py-1 rounded hover:bg-blue-800">
            SAVE
        </button>
    );
};
