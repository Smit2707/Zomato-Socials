import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../../api/axios"
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {

    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

    const watchVideo = watch('video');

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);

            // Create preview for video
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    // Handle form submission
    const onSubmit = async (data) => {
        if (!selectedFile) {
            toast.error('Please select a video file', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        setIsUploading(true);

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('video', selectedFile);
            formData.append('name', data.name);
            formData.append('description', data.description);

            // Here you would make your API call
            const response = await axios.post("/food", formData, {withCredentials: true});
            console.log(response)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // if (response.ok) {
            toast.success('Food video uploaded successfully!', {
                position: "top-right",
                autoClose: 3000,
            });

            // Reset form
            reset();
            setSelectedFile(null);
            setPreviewUrl(null);
            navigate("/")
            // } else {
            //   throw new Error('Upload failed');
            // }
        } catch (error) {
            toast.error('Failed to upload food video. Please try again.', {
                position: "top-right",
                autoClose: 3000,
            });
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Create Food Video</h1>
                        <p className="text-gray-600 mt-2">Share your delicious creations with the community</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Video Upload Field */}
                        <div>
                            <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
                                Video
                            </label>

                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                <div className="space-y-1 text-center">
                                    {previewUrl ? (
                                        <div className="relative">
                                            <video
                                                src={previewUrl}
                                                className="mx-auto h-full w-full rounded-lg object-cover"
                                                controls
                                                autoPlay
                                                loop
                                                muted
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedFile(null);
                                                    setPreviewUrl(null);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="video" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
                                                    <span>Upload a video</span>
                                                    <input
                                                        id="video"
                                                        name="video"
                                                        type="file"
                                                        accept="video/*"
                                                        className="sr-only"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">MP4, MOV, AVI up to 100MB</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {errors.video && (
                                <p className="mt-1 text-sm text-red-600">{errors.video.message}</p>
                            )}

                            {selectedFile && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                </p>
                            )}
                        </div>

                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Food Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    required: "Food name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Food name must be at least 2 characters"
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Food name must be less than 100 characters"
                                    }
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                                placeholder="e.g., Fresh Karela Juice"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                {...register("description", {
                                    required: "Description is required",
                                    minLength: {
                                        value: 10,
                                        message: "Description must be at least 10 characters"
                                    },
                                    maxLength: {
                                        value: 500,
                                        message: "Description must be less than 500 characters"
                                    }
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300"
                                placeholder="Describe your food creation..."
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                {watch('description')?.length || 0}/500 characters
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isUploading}
                                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-orange-400 transition duration-300 flex items-center justify-center"
                            >
                                {isUploading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Uploading...
                                    </>
                                ) : (
                                    'Create Food Video'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Recent Uploads Preview (optional) */}
                <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Guidelines</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Videos should be high quality and well-lit</li>
                        <li>Show the food preparation process clearly</li>
                        <li>Keep descriptions engaging and informative</li>
                        <li>Ensure your video doesn't violate any copyrights</li>
                        <li>Videos will be reviewed before publishing</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CreateFood;