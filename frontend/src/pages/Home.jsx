import React, { useState, useRef, useEffect } from 'react';
import axios from '../api/axios'
import { Link } from 'react-router-dom';
const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const videoRefs = useRef([]);
  const [videos, setVideos] = useState([])
  console.log(videos)


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

  const fetchFoodVideos = async () => {
    const data = await axios.get('/food', { withCredentials: true });
    console.log(data.data)
    setVideos(data.data.food)
  }

  useEffect(() => {
    fetchFoodVideos();
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/70 to-transparent">
        <h1 className="text-xl font-bold text-white">FoodieGram</h1>
        <div className="flex space-x-4">
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </header>

      {/* Video Reels Container */}
      <div
        className="h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
        onScroll={handleScroll}
      >
        {videos.map((reel, index) => (
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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              {/* Store Name and Follow Button */}
              <div className="flex gap-4 items-center mb-2">
                <h3 className="text-white font-semibold text-lg">{reel.name}</h3>
                <button className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                  Follow
                </button>
              </div>

              {/* Video Title and Description */}
              <div className="mb-3">
                <h2 className="text-white font-bold text-base mb-1">{reel.name}</h2>
                <div
                  className={`text-gray-200 text-xs ${expandedDescriptions[reel.id] ? '' : 'line-clamp-2'}`}
                  onClick={() => toggleDescription(reel._id)}
                >
                  {reel.description}
                </div>
                {expandedDescriptions[reel.id] && (
                  <button
                    className="text-gray-400 text-sm mt-1"
                    onClick={() => toggleDescription(reel._id)}
                  >
                    Show less
                  </button>
                )}
              </div>

              {/* Visit Store Button */}
              <Link to={"/food-partner/" + reel.foodPartner} className="w-full block text-center bg-orange-500 text-white py-2 rounded-lg font-semibold mb-0">
                Visit Store
              </Link>

              {/* Engagement Metrics */}
              {/* <div className="flex justify-between text-gray-300 text-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{reel.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{reel.comments.toLocaleString()}</span>
                </div>
              </div> */}
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center">
                <button className="bg-white/20 rounded-full p-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                {/* <span className="text-white text-xs">{reel.likes.toLocaleString()}</span> */}
              </div>

              <div className="flex flex-col items-center">
                <button className="bg-white/20 rounded-full p-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                {/* <span className="text-white text-xs">{reel.comments.toLocaleString()}</span> */}
              </div>

              <button className="bg-white/20 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      {/* <nav className="fixed bottom-0 left-0 right-0 bg-black flex justify-around items-center p-3 border-t border-gray-800">
        <button className="text-white flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button className="text-gray-400 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-xs mt-1">Search</span>
        </button>
        
        <button className="text-white bg-orange-500 rounded-full p-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        
        <button className="text-gray-400 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-xs mt-1">Orders</span>
        </button>
        
        <button className="text-gray-400 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </button>
      </nav> */}
    </div>
  );
};

export default Home;