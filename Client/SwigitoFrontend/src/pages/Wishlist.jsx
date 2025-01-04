import React from 'react';

function Wishlist() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      {/* Animated Icon */}
      <div className="text-yellow-500 text-8xl mb-4 animate-pulse">
        🚀
      </div>

      {/* Main Message */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        We're Building Something Amazing!
      </h1>
      <p className="text-gray-700 text-lg text-center mb-6 max-w-xl">
        Our Wishlist feature is currently under construction. We're working hard to bring you an incredible experience. 
        Please check back soon!
      </p>

      {/* Animated Loader */}
      <div className="flex justify-center items-center gap-2">
        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
}

export default Wishlist;
