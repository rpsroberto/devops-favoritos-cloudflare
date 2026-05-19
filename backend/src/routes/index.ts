import { Router } from "express";
import { clientRoutes } from "./clientRoutes";
import { productRoutes } from "./productRoutes";

const routes = Router();

routes.get("/health", (_request, response) => {
  return response.json({ status: "ok" });
});

routes.use("/clients", clientRoutes);
routes.use("/products", productRoutes);

export { routes };
