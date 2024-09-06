import { useState, ChangeEvent } from "react";
import axios from "axios";
import { BACKEND_URL, CLOUDINARY_URL, CLOUDINARY_PRESET } from "../config";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../component/Appbar";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [image, setImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [Access, setAccess] = useState<string>("public");
    const navigate = useNavigate();

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            setImageURL(response.data.secure_url);
        } catch (error) {
            console.error("Error uploading image:", error);
            setImageURL(null); // Reset imageURL on error
        } finally {
            setUploading(false); // Reset uploading state
        }
    };


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setUploading(true); // Set uploading state
            // setImage(file);
            handleImageUpload(file); // Start image upload
        }
    };

    const handleSubmit = async () => {
        if (!imageURL) {
            console.error("Image URL is not available. Image upload might have failed.");
            setUploading(false);
            // return; // Exit if image URL is not available
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description,
                image: imageURL, // Include image URL in the request body
                access: Access, // Include   in the request body
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            console.log(response); // Log response for debugging
            console.log("access is" + Access);
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <Appbar />
            <div className="min-h-screen bg-white text-black flex items-center justify-center">
                <div className="max-w-screen-lg w-full p-8 bg-white border border-black rounded-lg shadow-md">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 mb-4"
                        placeholder="Title"
                    />
                    <TextEditor onChange={(e) => setDescription(e.target.value)} />
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Access
                        </label>
                        <select
                            id="access-level"   
                            name="access"       
                            value={Access}     
                            onChange={(e) => setAccess(e.target.value)}   
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>

                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange} // Use the image change handler
                        className="mt-4 block w-full text-sm text-black border border-black rounded-lg cursor-pointer bg-white focus:outline-none"
                    />
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        disabled={uploading} // Disable button while uploading
                        className={`mt-4 w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white rounded-lg ${uploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'} focus:ring-4 focus:ring-black`}
                    >
                        {uploading ? 'Uploading...' : 'Publish Post'}
                    </button>
                </div>
            </div>
        </>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border-b border-black">
                    <div className="my-2 w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            onChange={onChange}
                            id="editor"
                            rows={8}
                            className="focus:outline-none block w-full px-0 text-sm text-black bg-white border-0 pl-2"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
