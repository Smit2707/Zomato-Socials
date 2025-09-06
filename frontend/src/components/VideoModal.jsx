import React from 'react'

const VideoModal = ({selectedVideo, closeVideoModal}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
                <button
                    onClick={closeVideoModal}
                    className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                    <video
                        src={selectedVideo.video}
                        className="absolute inset-0 w-full h-full object-contain"
                        controls
                        autoPlay
                    />
                </div>

                <div className="p-4 text-white">
                    <h3 className="text-xl font-semibold">{selectedVideo.name}</h3>
                    <p className="text-gray-300 mt-2">{selectedVideo.description}</p>

                    <div className="flex items-center mt-4">
                        <div className="flex items-center mr-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            <span>{selectedVideo.views || 0} views</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{selectedVideo.likes?.length || 0} likes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoModal