import { NextRequest } from 'next/server';
import { register } from '@/lib/auth';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, validateRequestBody } from '@/lib/api-utils';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const POST = requestMiddleware(async (request: NextRequest) => {
  const body = await validateRequestBody(request);

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({
      errorMessage: parsed.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', '),
      status: 400,
    });
  }

  const { name, email, password } = parsed.data;
  const result = await register(name, email, password);

  if (!result) {
    return createErrorResponse({
      errorMessage: 'Email already registered',
      status: 409,
    });
  }

  return createSuccessResponse({ token: result.token, user: result.user }, 201);
});
