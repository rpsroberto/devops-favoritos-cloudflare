import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "*"
  })
);
app.use(express.json());
app.use(routes);
app.use(errorHandler);
