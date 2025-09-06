import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import axios from "../../api/axios"
import VideoGrid from './partner-details/VideoGrid';
import AboutTab from './partner-details/tabs/AboutTab';
import ReviewsTab from './partner-details/tabs/ReviewsTab';
import VideoModal from '../../components/VideoModal';
import NoVideo from './partner-details/NoVideo';
import Header from './partner-details/partner-header/Header';
import MainHeader from './partner-details/partner-header/MainHeader';

const PartnerDetails = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [profile, setProfile] = useState(null);
  const [food, setFood] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ... your existing code

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };
  console.log(food);

  const { id } = useParams();

  const fetchPartnerDetails = async () => {
    const res = await axios.get(`/food-partner/profile/${id}`, { withCredentials: true });
    setProfile(res.data.partner);
    setFood(res.data.foods);
  }

  useEffect(() => {
    fetchPartnerDetails();
  }, [])

  // Sample partner data
  const partnerInfo = {
    businessName: "Burger Heaven",
    address: "123 Food Street, Culinary District, 10001",
    contact: "+1 (555) 123-4567",
    email: "contact@burgerheaven.com",
    totalMeals: 24,
    rating: 4.7,
    reviews: 128,
    joinedDate: "January 2023",
    description: "Serving the juiciest, most delicious burgers in town since 2015. All our ingredients are locally sourced and freshly prepared daily."
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Partner Header Section */}
        <MainHeader partnerInfo={partnerInfo} profile={profile} setProfile={setProfile} />

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`ml-8 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'videos' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('videos')}
              >
                Videos
              </button>
              <button
                className={`ml-8 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'about' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button
                className={`ml-8 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </nav>
          </div>
        </div>

        {/* Video Grid */}
        {activeTab === 'videos' && (
          <div className="w-full h-fit">
            {/* Grid Layout */}
            <VideoGrid food={food} openVideoModal={openVideoModal} />

            {/* No videos message */}
            {(!food || food.length === 0) && (
              <NoVideo />
            )}
          </div>
        )}

        {/* Video Modal */}
        {isModalOpen && selectedVideo && (
          <VideoModal selectedVideo={selectedVideo} closeVideoModal={closeVideoModal} />
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <AboutTab partnerInfo={partnerInfo} />
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <ReviewsTab />
        )}
      </main>
    </div>
  );
};

export default PartnerDetails;