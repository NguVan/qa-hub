import mongoose from "mongoose";

export interface HealthStatus {
  status: "up" | "degraded";
  uptime: number;
  database: "connected" | "disconnected";
}

export const getHealthStatus = (): HealthStatus => {
  const isDbConnected = mongoose.connection.readyState === 1;

  return {
    status: isDbConnected ? "up" : "degraded",
    uptime: process.uptime(),
    database: isDbConnected ? "connected" : "disconnected",
  };
};