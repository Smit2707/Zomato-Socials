import React, { useState, useRef, useEffect } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Saved = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const [likedVideos, setLikedVideos] = useState(new Set());
    const [savedVideos, setSavedVideos] = useState(new Set());
    const videoRefs = useRef([]);
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    const token = Cookies.get('token');

    // Handle scroll to snap to videos
    const handleScroll = (e) => {
        const container = e.target;
        const scrollTop = container.scrollTop;
        const videoHeight = container.offsetHeight;
        const newIndex = Math.round(scrollTop / videoHeight);

        if (newIndex !== currentVideoIndex) {
            setCurrentVideoIndex(newIndex);

            // Pause all videos except the current one
            videoRefs.current.forEach((video, index) => {
                if (video) {
                    if (index === newIndex) {
                        video.play().catch(error => console.log("Auto-play prevented:", error));
                    } else {
                        video.pause();
                    }
                }
            });
        }
    };

    // Toggle description expansion
    const toggleDescription = (id) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Initialize video playback for the first video
    useEffect(() => {
        if (videoRefs.current[0]) {
            videoRefs.current[0].play().catch(error => console.log("Auto-play prevented:", error));
        }
    }, []);

    const fetchSavedVideos = async () => {
        try {
            const response = await axios.get('/food/save', { withCredentials: true });
            console.log('Saved API Response:', response.data);
            
            // Extract food data from savedFoods array
            const savedFoods = response.data.savedFoods || [];
            const foodVideos = savedFoods.map(savedItem => savedItem.food);
            
            setVideos(foodVideos);

            // Mark all videos as saved since they're all from the saved list
            const savedSet = new Set();
            foodVideos.forEach(video => {
                savedSet.add(video._id);
            });
            setSavedVideos(savedSet);

            // Mark liked videos (you might need to implement this based on your API)
            const likedSet = new Set();
            // For now, we'll leave this empty since the API response doesn't show like status
            setLikedVideos(likedSet);
        } catch (error) {
            console.error('Error fetching saved videos:', error);
        }
    };

    const likeFood = async (foodId) => {
        try {
            const response = await axios.post('/food/like', { foodId: foodId }, { withCredentials: true });
            if (response.data.like) {
                setVideos(prev => prev.map(video => video._id === foodId ? { ...video, likeCount: video.likeCount + 1 } : video));
                setLikedVideos(prev => new Set([...prev, foodId]));
            } else {
                setVideos(prev => prev.map(video => video._id === foodId ? { ...video, likeCount: video.likeCount - 1 } : video));
                setLikedVideos(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(foodId);
                    return newSet;
                });
            }
        } catch (error) {
            console.error('Error liking food:', error);
        }
    };

    const saveFood = async (foodId) => {
        try {
            const response = await axios.post('/food/save', { foodId: foodId }, { withCredentials: true });
            if (response.data.save) {
                setVideos(prev => prev.map(video => video._id === foodId ? { ...video, saveCount: video.saveCount + 1 } : video));
                setSavedVideos(prev => new Set([...prev, foodId]));
            } else {
                setVideos(prev => prev.map(video => video._id === foodId ? { ...video, saveCount: video.saveCount - 1 } : video));
                setSavedVideos(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(foodId);
                    return newSet;
                });

                // Remove from videos list if we're on the saved page
                setVideos(prev => prev.filter(video => video._id !== foodId));
            }
        } catch (error) {
            console.error('Error saving food:', error);
        }
    };

    useEffect(() => {
        fetchSavedVideos();
    }, []);

    return (
        <div className="relative h-screen w-full bg-black overflow-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/70 to-transparent">
                <h1 className="text-xl font-bold text-white">Saved Videos</h1>
                <div className="flex space-x-4">
                    <button className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Video Reels Container */}
            <div
                className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
                onScroll={handleScroll}
            >
                {videos.length > 0 ? (
                    videos.map((reel, index) => (
                        <div
                            key={reel._id}
                            className="h-screen w-full snap-start relative flex items-center justify-center"
                        >
                            {/* Video Player */}
                            <video
                                ref={el => videoRefs.current[index] = el}
                                src={reel.video}
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover"
                            />

                            {/* Video Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 pb-15 bg-gradient-to-t from-black/80 to-transparent">
                                {/* Store Name and Follow Button */}
                                <div className="flex gap-4 items-center mb-2">
                                    <h3 className="text-white font-semibold text-lg">{reel.name}</h3>
                                    <button className="bg-white text-black px-4 py-1 rounded-full text-xs font-medium">
                                        Follow
                                    </button>
                                </div>

                                {/* Video Title and Description */}
                                <div className="mb-3">
                                    <h2 className="text-white font-bold text-base mb-1">{reel.name}</h2>
                                    <div
                                        className={`text-gray-200 text-xs ${expandedDescriptions[reel._id] ? '' : 'line-clamp-2'}`}
                                        onClick={() => toggleDescription(reel._id)}
                                    >
                                        {reel.description}
                                    </div>
                                    {expandedDescriptions[reel._id] && (
                                        <button
                                            className="text-gray-400 text-sm mt-1"
                                            onClick={() => toggleDescription(reel._id)}
                                        >
                                            Show less
                                        </button>
                                    )}
                                </div>

                                {/* Visit Store Button */}
                                <Link to={"/food-partner/" + reel.foodPartner} className="w-fit block text-center px-5 text-sm bg-orange-500 text-white py-2 rounded-lg font-semibold mb-0">
                                    Visit Store
                                </Link>
                            </div>

                            {/* Right Side Actions */}
                            <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
                                <div onClick={() => likeFood(reel._id)} className="flex flex-col items-center">
                                    <button className="bg-white/20 rounded-full p-2 mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${likedVideos.has(reel._id) ? 'text-pink-500' : 'text-white'}`} fill={likedVideos.has(reel._id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                    <span className="text-white text-xs font-medium">{reel?.likeCount ?? 24}</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <button className="bg-white/20 rounded-full p-2 mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </button>
                                    <span className="text-white text-xs font-medium">{reel?.comments ?? 8}</span>
                                </div>

                                <div onClick={() => saveFood(reel._id)} className="flex flex-col items-center">
                                    <button className="bg-white/20 rounded-full p-2 mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-white`} fill={savedVideos.has(reel._id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>
                                    <span className="text-white text-xs font-medium">{reel?.saveCount ?? 15}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-white">
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            <h2 className="text-xl font-semibold mb-2">No saved videos yet</h2>
                            <p className="text-gray-400">Save videos you like to watch them later</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-black flex justify-around items-center px-3 py-1 border-t border-gray-800">
                <button onClick={() => navigate("/")} className="text-gray-400 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-xs mt-1">Home</span>
                </button>

                {/* <button className="text-white bg-orange-500 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button> */}

                <button className="text-white flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span className="text-xs mt-1">Saved</span>
                </button>
            </nav>
        </div>
    );
};

export default Saved;