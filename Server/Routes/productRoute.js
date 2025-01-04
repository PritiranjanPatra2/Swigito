import express from 'express';
import upload from '../Middlewares/multer.js';
import { addProduct, getProduct, getProducts } from '../Controllers/productController.js';
import { protectRoute } from '../Middlewares/auth.js'



const productRouter = express.Router();

productRouter.post("/add",protectRoute, upload.single("image"), addProduct)
productRouter.get('/get', getProducts);
productRouter.get('/get/:id', getProduct);

export default productRouter;