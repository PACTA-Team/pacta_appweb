import { NextRequest } from 'next/server';
import { login } from '@/lib/auth';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, validateRequestBody } from '@/lib/api-utils';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const POST = requestMiddleware(async (request: NextRequest) => {
  const body = await validateRequestBody(request);

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({
      errorMessage: parsed.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', '),
      status: 400,
    });
  }

  const { email, password } = parsed.data;
  const result = await login(email, password);

  if (!result) {
    return createErrorResponse({
      errorMessage: 'Invalid email or password',
      status: 401,
    });
  }

  return createSuccessResponse({ token: result.token, user: result.user });
});
