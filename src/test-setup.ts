// Global test setup
import { vi } from 'vitest';

// Polyfill crypto.randomUUID for Node.js test environment
if (typeof globalThis.crypto === 'undefined') {
  (globalThis as any).crypto = require('crypto').webcrypto;
}
