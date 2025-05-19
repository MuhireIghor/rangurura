import express from "express";
import { config } from "dotenv";
import { connectDB } from "./configs/db.config";
import logger from "./utils/logger.utils";
import errorHandler from "@/middleware/error.middleware";
import appRoutes from "@/routes";
import morgan from "morgan";
import helmet from "helmet";
import requestLogger, { loggerFormat } from "./utils/request-logger.utils";
import { corsOptions } from "./utils/variables";
import cors from "cors";
const appLogger = logger("app");

config();
const app = express();
connectDB()
  .then(() => {
    appLogger.info("Database connected successfully");
  })
  .catch((error) => {
    appLogger.error(`Error occured while connecting to app ${error.message}`);
  });
app.use(cors(corsOptions));
app.use(express.json({ limit: "infinity" }));
app.use(morgan("dev"));
app.use(morgan(loggerFormat, { stream: requestLogger.stream }));
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/v1", appRoutes);
app.use("/api/v1", errorHandler);
export default app;
