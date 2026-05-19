import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import { FavoriteController } from "../controllers/FavoriteController";
import { asyncHandler } from "../middlewares/asyncHandler";

const clientRoutes = Router();
const clientController = new ClientController();
const favoriteController = new FavoriteController();

clientRoutes.post("/", asyncHandler(clientController.create));
clientRoutes.get("/", asyncHandler(clientController.list));
clientRoutes.get("/:id", asyncHandler(clientController.getById));
clientRoutes.put("/:id", asyncHandler(clientController.update));
clientRoutes.delete("/:id", asyncHandler(clientController.delete));

clientRoutes.post("/:clientId/favorites", asyncHandler(favoriteController.add));
clientRoutes.get("/:clientId/favorites", asyncHandler(favoriteController.listByClient));
clientRoutes.delete("/:clientId/favorites/:productId", asyncHandler(favoriteController.remove));

export { clientRoutes };
