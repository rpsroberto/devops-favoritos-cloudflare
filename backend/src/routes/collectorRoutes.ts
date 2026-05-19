import { Router } from "express";
import { CollectorController } from "../controllers/CollectorController";
import { StickerController } from "../controllers/StickerController";
import { asyncHandler } from "../middlewares/asyncHandler";

const collectorRoutes = Router();
const collectorController = new CollectorController();
const stickerController = new StickerController();

collectorRoutes.post("/", asyncHandler(collectorController.create));
collectorRoutes.get("/", asyncHandler(collectorController.list));
collectorRoutes.get("/:id", asyncHandler(collectorController.getById));
collectorRoutes.put("/:id", asyncHandler(collectorController.update));
collectorRoutes.delete("/:id", asyncHandler(collectorController.delete));

collectorRoutes.post("/:collectorId/wanted", asyncHandler(stickerController.addWanted));
collectorRoutes.get("/:collectorId/wanted", asyncHandler(stickerController.listWanted));
collectorRoutes.delete("/:collectorId/wanted/:stickerCode", asyncHandler(stickerController.removeWanted));

collectorRoutes.post("/:collectorId/duplicates", asyncHandler(stickerController.addDuplicate));
collectorRoutes.get("/:collectorId/duplicates", asyncHandler(stickerController.listDuplicates));
collectorRoutes.delete("/:collectorId/duplicates/:stickerCode", asyncHandler(stickerController.removeDuplicate));

export { collectorRoutes };
