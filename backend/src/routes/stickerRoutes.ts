import { Router } from "express";
import { StickerController } from "../controllers/StickerController";
import { asyncHandler } from "../middlewares/asyncHandler";

const stickerRoutes = Router();
const stickerController = new StickerController();

stickerRoutes.get("/", asyncHandler(stickerController.listCatalog));

export { stickerRoutes };
