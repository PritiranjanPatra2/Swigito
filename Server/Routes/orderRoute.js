import express from 'express';
import { createOrder } from '../Controllers/orderController.js';
import { protectRoute } from '../Middlewares/auth.js';
const orderRouter = express.Router();

orderRouter.post("/create", protectRoute, createOrder);

export default orderRouter;