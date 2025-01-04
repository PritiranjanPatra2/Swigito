import React from 'react'
import { useAuth } from '../contexts/Auth.jsx'
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';

function useWishlist() {

    const {isAuthenticated, user, updateUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();


    function isInWishlist(productId){
        return user?.wishlist.includes(productId);
    }

    async function toggleWishlist(productId){
        (await isInWishlist(productId))
        ? handleRemoveFromWishlist(productId)
        : handleAddTowishlist(productId);
    }

    async function handleAddTowishlist(productId){
        if(!isAuthenticated){
            const cuurentPath = location.pathname;
            navigate("/login?referer=" + encodeURIComponent(cuurentPath));
            return;
        }

        try {
            await instance.post("/user/wishlist/add", {productId});

            const updatedUser = {
                ...user,
                wishlist: [...(user.wishlist || []), productId],
            };

            updateUser(updatedUser);
        } catch (error) {
            console.log("Error adding to wishlist", error);
        }
    }

    async function handleRemoveFromWishlist(productId) {
        try {
            await instance.delete("/user/wishlist/remove/" + productId);
    
            const updatedUser = {
                ...user,
                wishlist: user.wishlist.filter((id) => id !== productId), 
            };
    
            updateUser(updatedUser);
        } catch (error) {
            console.log("Error in removing from wishlist", error);
        }
    }
    
    
  return {isInWishlist, toggleWishlist};
}

export default useWishlist
