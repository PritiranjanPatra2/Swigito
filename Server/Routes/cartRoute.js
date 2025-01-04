import express from 'express';
import {addToCart, getCart, updateQuantity, removeFromCart} from '../Controllers/cartController.js';
import {protectRoute} from '../Middlewares/auth.js'

const cartRouter = express.Router();

cartRouter.post("/add", protectRoute, addToCart);
cartRouter.get("/", protectRoute, getCart);
cartRouter.put("/quantity", protectRoute, updateQuantity);
cartRouter.delete("/remove/:productId", protectRoute, removeFromCart);

export default cartRouter;