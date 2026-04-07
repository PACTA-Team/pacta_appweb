import { getDb } from './db';
import bcrypt from 'bcrypt';

const BCRYPT_ROUNDS = 12;

export async function seedDatabase(): Promise<void> {
  const db = getDb();

  // Check if data already exists
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (userCount.count > 0) {
    return; // Already seeded
  }

  const now = new Date().toISOString();

  // Hash default admin password
  const passwordHash = await bcrypt.hash('pacta123', BCRYPT_ROUNDS);

  // Insert admin user
  db.prepare(`
    INSERT INTO users (id, name, email, password_hash, role, status, last_access, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run('1', 'Pacta User', 'admin@pacta.local', passwordHash, 'admin', 'active', now, now);

  // Insert sample client
  db.prepare(`
    INSERT INTO clients (id, name, address, reu_code, contacts, created_by, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run('1', 'Sample Client SA', '123 Main St', 'REU-001', 'contact@sample.com', '1', now, now);

  // Insert sample supplier
  db.prepare(`
    INSERT INTO suppliers (id, name, address, reu_code, contacts, created_by, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run('1', 'Sample Supplier SRL', '456 Oak Ave', 'REU-002', 'info@supplier.com', '1', now, now);

  console.log('Database seeded successfully');
}
