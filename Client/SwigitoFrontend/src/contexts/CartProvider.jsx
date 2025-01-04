import React, { createContext, useEffect, useState } from 'react'
import { useAuth } from './Auth.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';

export const CartContext = createContext(null);

function CartProvider({children}) {
    const {isAuthenticated} = useAuth();
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      if(isAuthenticated) fetchCart();
    }, [isAuthenticated]);
  
    async function addToCart(productId, quantity = 1){
      if(!isAuthenticated){
          const currentPath = location.pathname;
          navigate(`/login?referer=${encodeURIComponent(currentPath)}`);
          return;
      }
  
      try {
          const response = await instance.post("/cart/add", {
              productId,
              quantity
          });
  
          setCart(response.data.cart);
      } catch (error) {
          console.log("Error adding product to cart", error);
      }
    }
  
    async function fetchCart() {
      if(!isAuthenticated) return;
  
      try {
          const response = await instance.get('/cart');
          setCart(response.data.cart);
      } catch (error) {
          console.log("Error fetching cart: ", error);
      }
    }
  
    async function updateQuantity(productId, quantity) {
       try {
          const response = await instance.put("/cart/quantity", {
              productId,
              quantity,
          });
          setCart(response.data.cart);
       } catch (error) {
          console.error("Error updating quantity:", error);
       }
    }
  
    async function removeFromCart(productId){
      try {
          const response = await instance.delete('/cart/remove/' +productId);
          setCart(response.data.cart);
      } catch (error) {
          console.error("Error removing from cart");
      }
    }

    function modifyCart(updatedCart) {
        const { finalAmount, discountAmount } = updatedCart;
        setCart({
          ...cart,
          totalAmount: finalAmount,
          discountAmount: discountAmount,
        });
      }
    return (
        <CartContext.Provider 
          value = {{ addToCart, 
                     cart, 
                     fetchCart, 
                     updateQuantity, 
                     removeFromCart,
                     modifyCart}}>
          {children}
        </CartContext.Provider>
    ) ;
}

export default CartProvider;
