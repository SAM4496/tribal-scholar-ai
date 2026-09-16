import { PrismaClient } from '@prisma/client';

// This pattern ensures we only create ONE database connection,
// even when Next.js hot-reloads during development.
// Without this, each hot-reload would create a new connection
// and eventually you'd run out of database connections.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
