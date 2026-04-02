import type { Request, Response } from "express";
import os from "os";



function formatUptime(uptime: number): string {
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

function formatCpuUsage(cpuUsage: NodeJS.CpuUsage): string {
  const total = cpuUsage.user + cpuUsage.system;
  const percentage = (total / 100) * 100;
  return `${percentage.toFixed(2)}%`;
}

export function getHealth(_req: Request, res: Response): void {
  res.status(200).json({
    status: "ok",
    version: "1.0.0",

    timestamp: new Date().toISOString(),

    uptime: formatUptime(process.uptime()),
    memoryUsage: process.memoryUsage(),
    cpuUsage: formatCpuUsage(process.cpuUsage()),

    cpuCores: os.cpus().length,
  });
}
