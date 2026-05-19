import { Router } from "express";
import { MatchController } from "../controllers/MatchController";
import { asyncHandler } from "../middlewares/asyncHandler";

const matchRoutes = Router();
const matchController = new MatchController();

matchRoutes.get("/", asyncHandler(matchController.list));

export { matchRoutes };
