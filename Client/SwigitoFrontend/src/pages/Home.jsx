import React, { useEffect, useState } from 'react';
import instance from '../axiosConfig';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(){
    try {
      const response = await instance.get("/product/get");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <div className="w-full h-full">
      <HeroSection />
      <div className='w-full flex justify-around items-start gap-4 p-8 flex-wrap' id='home-section'>
        {products.length > 0 &&
          products.map((product) => {
            return <ProductCard product={product} key={product.uid} />;
          })
        }
      </div>
    </div>
  );
}

export default Home;

const HeroSection = () => {
  const scrollToHome = () => {
    const homeSection = document.getElementById("home-section");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1273516682.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg mb-6">Find the best products curated just for you!</p>
        <button
          onClick={scrollToHome}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-lg font-semibold"
        >
          View Items
        </button>
      </div>
    </div>
  );
};
