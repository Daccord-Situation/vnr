import { PrismaClient } from '@prisma/client';

/**
 * Instance Prisma partagée dans l'application.
 *
 * En développement, on réutilise l'instance entre les hot-reloads
 * pour éviter d'ouvrir trop de connexions.
 */
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.__prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma;
}

/**
 * Résultat du test de connexion à la base de données.
 */
export interface DbConnectionStatus {
  connected: boolean;
  error?: string;
}

/**
 * Vérifie la connexion à PostgreSQL via Prisma.
 * Exécute une requête SQL minimale (SELECT 1).
 */
export async function checkDatabaseConnection(): Promise<DbConnectionStatus> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { connected: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { connected: false, error: message };
  }
}
