// lib/middleware/logger.ts
import {NextRequest } from "next/server";
export function loggerMiddleware(request: NextRequest) {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname}`);
  return null;
}