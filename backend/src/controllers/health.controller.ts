import type { Request, Response } from "express";
import * as healthService from "../services/health.service.ts";

export const getHealth = (_req: Request, res: Response): void => {
  const health = healthService.getHealthStatus();
  const isHealthy = health.database === "connected";

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    message: isHealthy ? "OK" : "Database is not connected",
    data: health,
  });
};