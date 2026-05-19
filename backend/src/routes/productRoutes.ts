import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { asyncHandler } from "../middlewares/asyncHandler";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get("/", asyncHandler(productController.list));

export { productRoutes };
