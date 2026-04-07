import { createSuccessResponse } from '@/lib/create-response';
import { requestMiddleware } from "@/lib/api-utils";
import { seedDatabase } from '@/lib/seed';

// Seed on first request
let seeded = false;

// GET request - health check endpoint
export const GET = requestMiddleware(async () => {
  if (!seeded) {
    await seedDatabase();
    seeded = true;
  }
  return createSuccessResponse({ status: 'ok' });
});


// POST request - health check endpoint
export const POST = requestMiddleware(async () => {
  return createSuccessResponse({ status: 'ok' });
});