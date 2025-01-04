import express from 'express';
import { applyCoupon, createCoupon, fetchCoupon } from '../Controllers/couponController.js';
import { protectRoute } from '../Middlewares/auth.js'
import { isSeller } from '../Middlewares/seller.js';

const couponRouter = express.Router();

couponRouter.post("/create", protectRoute, isSeller, createCoupon);
couponRouter.post("/apply", protectRoute, applyCoupon);
couponRouter.get("/", protectRoute, fetchCoupon);

export default couponRouter;