import React from 'react';

function MyProducts() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Construction Icon */}
      <div className="flex flex-col items-center bg-white p-8 shadow-lg rounded-lg">
        <div className="text-yellow-500 text-7xl mb-4">
          🚧
        </div>
        
        {/* Main Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Under Construction</h1>
        <p className="text-gray-600 text-lg text-center mb-6">
          This page is currently being worked on. Please check back later!
        </p>

        {/* Decorative Loader or Button */}
        <div className="flex justify-center items-center gap-4">
          <span className="text-lg text-yellow-500 animate-spin">
            ⌛
          </span>
          <p className="text-gray-600">Building something awesome for you!</p>
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
