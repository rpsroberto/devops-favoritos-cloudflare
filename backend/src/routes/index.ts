import { Router } from "express";
import { collectorRoutes } from "./collectorRoutes";
import { matchRoutes } from "./matchRoutes";
import { stickerRoutes } from "./stickerRoutes";

const routes = Router();

routes.get("/health", (_request, response) => {
  return response.json({ status: "ok" });
});

routes.use("/collectors", collectorRoutes);
routes.use("/stickers", stickerRoutes);
routes.use("/matches", matchRoutes);

export { routes };
