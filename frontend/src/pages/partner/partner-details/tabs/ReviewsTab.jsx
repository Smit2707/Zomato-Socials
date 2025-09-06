import React from 'react'

const ReviewsTab = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h2>
            <div className="space-y-6">
                {/* Sample Review 1 */}
                <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60"
                            alt="User"
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                            <div className="flex items-center">
                                <h4 className="text-sm font-medium text-gray-900">Sarah Johnson</h4>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-xs text-gray-500">2 days ago</span>
                            </div>
                            <div className="flex items-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-amber-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                The burgers here are absolutely amazing! The ingredients are fresh and the service was excellent.
                                Will definitely be coming back soon.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sample Review 2 */}
                <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start">
                        <img
                            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60"
                            alt="User"
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                            <div className="flex items-center">
                                <h4 className="text-sm font-medium text-gray-900">Michael Chen</h4>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-xs text-gray-500">1 week ago</span>
                            </div>
                            <div className="flex items-center mt-1">
                                {[1, 2, 3, 4].map((star) => (
                                    <svg
                                        key={star}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-amber-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-300"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                Good food and reasonable prices. The double cheese burger was delicious, though the fries could be crispier.
                                Overall a positive experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewsTab