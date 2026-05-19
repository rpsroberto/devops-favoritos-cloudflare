import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import { FavoriteController } from "../controllers/FavoriteController";

const clientRoutes = Router();
const clientController = new ClientController();
const favoriteController = new FavoriteController();

clientRoutes.post("/", clientController.create);
clientRoutes.get("/", clientController.list);
clientRoutes.get("/:id", clientController.getById);
clientRoutes.put("/:id", clientController.update);
clientRoutes.delete("/:id", clientController.delete);

clientRoutes.post("/:clientId/favorites", favoriteController.add);
clientRoutes.get("/:clientId/favorites", favoriteController.listByClient);
clientRoutes.delete("/:clientId/favorites/:productId", favoriteController.remove);

export { clientRoutes };
