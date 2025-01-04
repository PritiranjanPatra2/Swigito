import React from 'react';

function About() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-yellow-500 animate__animated animate__fadeIn animate__delay-1s">
        About Us <span role="img" aria-label="food">🍔</span>
      </h1>
      <p className="text-lg max-w-3xl text-center leading-relaxed mb-4 animate__animated animate__fadeIn animate__delay-2s">
        Welcome to <span className="font-bold text-yellow-500">Swigito</span>, your go-to platform for satisfying all your cravings! 
        We specialize in bringing delicious food from your favorite restaurants straight to your doorstep. 
        Our mission is to make food delivery seamless, quick, and enjoyable for everyone. <span role="img" aria-label="pizza">🍕</span>
      </p>
      <p className="text-lg max-w-3xl text-center leading-relaxed animate__animated animate__fadeIn animate__delay-3s">
        Whether you're hosting a party 🥳, working late 💼, or simply craving a midnight snack 🌙, 
        <span className="font-bold text-yellow-500"> Swigito</span> has got you covered. Thank you for choosing us! <span role="img" aria-label="heart">❤️</span>
      </p>
      <div className="mt-8">
        <button className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition transform hover:scale-105">
          Order Now <span role="img" aria-label="order">🥡</span>
        </button>
      </div>
    </div>
  );
}

export default About;
