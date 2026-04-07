import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { getDb } from './db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-secret-change-in-production-min-32-chars!!'
);

const BCRYPT_ROUNDS = 12;
const JWT_EXPIRY = '24h';

// Warn if using default secret
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.error('WARNING: Using default JWT_SECRET. Set a secure secret in production!');
}

export interface JWTPayload {
  sub: string;  // user id
  role: string;
  iat?: number;
  exp?: number;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(userId: string, role: string): Promise<string> {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      sub: payload.sub!,
      role: (payload as any).role,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

export async function login(email: string, password: string): Promise<{ token: string; user: any } | null> {
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND status = ?').get(email, 'active') as any;

  if (!user) return null;

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return null;

  // Update last access
  db.prepare('UPDATE users SET last_access = ? WHERE id = ?').run(new Date().toISOString(), user.id);

  const token = await createToken(user.id, user.role);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      lastAccess: user.last_access,
      createdAt: user.created_at,
    },
  };
}

export async function register(name: string, email: string, password: string): Promise<{ token: string; user: any } | null> {
  const db = getDb();

  // Check if email exists
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) return null;

  const id = Date.now().toString();
  const now = new Date().toISOString();
  const passwordHash = await hashPassword(password);

  db.prepare(
    'INSERT INTO users (id, name, email, password_hash, role, status, last_access, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(id, name, email, passwordHash, 'viewer', 'active', now, now);

  return login(email, password);
}
