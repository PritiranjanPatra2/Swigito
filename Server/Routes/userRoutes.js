import express from 'express';
import { addToWishlist, 
         changePassword,
         deleteUser, 
         editProfile, 
         forgotPassword, 
         login, 
         logout, 
         profile, 
         register, 
         registerSeller, 
         removeFromWishlist, 
         verifyOtp } from '../Controllers/userControllers.js';
import { protectRoute } from '../Middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/register-seller', registerSeller);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/change-password', changePassword);


userRouter.get('/profile', protectRoute, profile);
userRouter.put('/edit-profile', protectRoute, editProfile);
userRouter.delete('/deleteUser/:id', deleteUser);

userRouter.post('/wishlist/add', protectRoute, addToWishlist);
userRouter.delete("/wishlist/remove/:id", protectRoute, removeFromWishlist);


export default userRouter;