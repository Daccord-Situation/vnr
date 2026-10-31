import { Router, Request, Response } from 'express';
import { checkDatabaseConnection } from '../lib/db';

const router = Router();

/**
 * GET /health
 *
 * Retourne l'état de santé du service.
 * Preuve Sprint 0 : HTTP 200 + JSON { status: "ok" }.
 *
 * Vérifie également la connexion à la base de données PostgreSQL.
 * En cas d'échec de connexion, retourne HTTP 503 avec le détail.
 */
router.get('/', async (_req: Request, res: Response) => {
  const dbStatus = await checkDatabaseConnection();

  if (!dbStatus.connected) {
    res.status(503).json({
      status: 'degraded',
      service: 'vnr-backend',
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
      database: {
        connected: false,
        error: dbStatus.error,
      },
    });
    return;
  }

  res.status(200).json({
    status: 'ok',
    service: 'vnr-backend',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    database: {
      connected: true,
    },
  });
});

export default router;
