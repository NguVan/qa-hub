import express from "express";
import { healthRouter } from "./routes/health.routes.ts";
import { testCaseRouter } from "./routes/test-case.routes.ts";
import { notFoundHandler } from "./middlewares/not-found.ts";

export const app = express();

app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/test-cases", testCaseRouter);

app.use(notFoundHandler);