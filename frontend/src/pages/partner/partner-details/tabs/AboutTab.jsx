import React from 'react'

const AboutTab = ({partnerInfo}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">About {partnerInfo.businessName}</h2>
            <p className="text-gray-600 mb-4">
              {partnerInfo.description}
            </p>
            <p className="text-gray-600 mb-4">
              We take pride in using only the freshest ingredients sourced from local farmers and producers.
              Our chefs are passionate about creating memorable dining experiences through innovative recipes
              and traditional cooking techniques.
            </p>
            <p className="text-gray-600">
              Visit us today and experience the difference that quality ingredients and passionate cooking
              can make to your meal.
            </p>

            <h3 className="text-md font-medium text-gray-900 mt-6 mb-3">Business Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Thursday</span>
                <span className="text-gray-900">11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Friday - Saturday</span>
                <span className="text-gray-900">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="text-gray-900">12:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>
  )
}

export default AboutTab