import { NextRequest } from 'next/server';
import { verifyToken } from './auth';
import { getDb } from './db';
import { createErrorResponse } from './create-response';

/**
 * Middleware to authenticate requests using JWT tokens
 */
export async function authenticateRequest(request: NextRequest): Promise<{ user: any; token: string } | Response> {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createErrorResponse({
        errorMessage: 'Authorization header with Bearer token required',
        status: 401,
      });
    }

    const token = authHeader.substring(7);

    if (!token) {
      return createErrorResponse({
        errorMessage: 'JWT token is required',
        status: 401,
      });
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return createErrorResponse({
        errorMessage: 'Invalid or expired token',
        status: 401,
      });
    }

    // Fetch user from database
    const db = getDb();
    const user = db.prepare('SELECT id, name, email, role, status, last_access, created_at FROM users WHERE id = ?', payload.sub).get() as any;

    if (!user || user.status !== 'active') {
      return createErrorResponse({
        errorMessage: 'User not found or inactive',
        status: 401,
      });
    }

    return { user, token };
  } catch (error) {
    console.error('Authentication error:', error);
    return createErrorResponse({
      errorMessage: 'Authentication failed',
      status: 401,
    });
  }
}

/**
 * Higher-order function that wraps route handlers with authentication
 */
export function withAuth(
  handler: (request: NextRequest, context: { user: any; token: string }) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    const authResult = await authenticateRequest(request);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { user, token } = authResult;

    try {
      return await handler(request, { user, token });
    } catch (error) {
      console.error('Handler error:', error);

      const anyError = error as any;
      const errorMessage: string =
        typeof anyError?.message === "string"
          ? anyError.message
          : "Internal server error";
      const status: number =
        typeof anyError?.statusCode === "number"
          ? anyError.statusCode
          : 500;

      return createErrorResponse({
        errorMessage,
        status,
      });
    }
  };
}
