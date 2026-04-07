import { NextResponse } from 'next/server';
import { createAdminUser, hasAdminUser } from '@/lib/seed';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { passwordSchema } from '@/lib/validation-schemas';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, adminName, username, password } = body;

    if (!companyName || !adminName || !username || !password) {
      return createErrorResponse({
        errorMessage: 'All fields are required',
        status: 400,
      });
    }

    // Validate password strength
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      return createErrorResponse({
        errorMessage: passwordResult.error.errors[0].message,
        status: 400,
      });
    }

    // Check if admin already exists
    if (hasAdminUser()) {
      return createErrorResponse({
        errorMessage: 'Setup already completed. Admin user already exists.',
        status: 409,
      });
    }

    const result = await createAdminUser(adminName, username, password);

    if (!result.success) {
      return createErrorResponse({
        errorMessage: result.error || 'Failed to create admin',
        status: 400,
      });
    }

    return NextResponse.json(
      createSuccessResponse({ message: 'Admin user created successfully. You can now login.' })
    );
  } catch (error) {
    console.error('Setup error:', error);
    return createErrorResponse({
      errorMessage: 'Setup failed',
      status: 500,
    });
  }
}
