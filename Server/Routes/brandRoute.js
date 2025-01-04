import express from 'express'
import { createBrand, deleteBrand, getBrands, updateBrand } from '../Controllers/brandController.js';
import { protectRoute } from '../Middlewares/auth.js';

const brandRouter = express.Router();

brandRouter.post("/create", protectRoute, createBrand);
brandRouter.get("/", getBrands);
brandRouter.put("/edit/:brandId", protectRoute, updateBrand)
brandRouter.delete("/delete/:brandId", protectRoute, deleteBrand)


export default brandRouter;
