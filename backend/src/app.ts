import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";

export const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://devops-favoritos-cloudflare.pages.dev"
].filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".devops-favoritos-cloudflare.pages.dev")) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(errorHandler);
