import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom';
import instance from '../axiosConfig.js';
import  useWishlist  from '../hooks/useWishlist.jsx';
import  useCart  from '../hooks/useCart.jsx';
import { LiaRupeeSignSolid } from "react-icons/lia";


function SingleProduct() {
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    const { toggleWishlist, isInWishlist, loading} = useWishlist();
    const { addToCart, loading: cartLoading } = useCart();

    const { id } = useParams();
    if(!id) navigate("/");

    useEffect(() => {
      if(id) fetchData(id);
    }, [id]);

    async function fetchData(id){
      try {
        const response = await instance.get('/product/get/' + id);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <>
    {product && (
       <div id="singleProduct" className="flex gap-2 px-12 py-12">
       <div className="left w-1/4 mr-6">
         <img className="" src={product.image} />
       </div>
       <div className="right w-3/4">
         <h3 className="text-4xl mb-2">{product.name}</h3>
         <p className="flex items-center font-bold mb-2">
           <LiaRupeeSignSolid />
           {product.price}
         </p>
         <p className="mb-2">{product.category}</p>
         <p className="mb-2">{product.brand}</p>

         <p className="mb-2">{product.description}</p>
         <button
           onClick={() => toggleWishlist(product._id)}
           className="addToCartBtn px-5 py-2 rounded-lg bg-red-500 text-white mx-3"
           disabled={loading}
         >
           {isInWishlist(product._id)
             ? "Remove from FoodList"
             : "Add to FoodList"}
         </button>
         <button
           onClick={() => addToCart(product._id)}
           className="addToCartBtn px-5 py-2 rounded-lg bg-red-500 text-white mx-3"
           disabled={cartLoading}
         >
           Add To Cart
         </button>
       </div>
     </div>
    )

    }
    </>
  )
}

export default SingleProduct
