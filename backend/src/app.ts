import express, { Application, Request, Response, NextFunction } from 'express';
import healthRouter from './routes/health';

/**
 * Application Express — VNR Backend.
 *
 * Sprint 0 — Incrément I1 : socle SaaS sécurisé.
 * Stack validée : Node.js · TypeScript · Express · PostgreSQL · Prisma.
 *
 * Architecture en deux perspectives strictement séparées (Phase A) :
 *   - Platform Side : exploitation de VNR par Daccord Situation.
 *   - Business Side : gestion de l'activité de l'entreprise cliente (tenant).
 *
 * Les routes métier seront organisées sous /api/platform et /api/business
 * lors des incréments suivants (hors périmètre Sprint 0 validé).
 */
const app: Application = express();

// --- Middlewares globaux ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use('/health', healthRouter);

// Route racine — informations de service
app.get('/', (_req: Request, res: Response) => {
  res.json({
    service: 'vnr-backend',
    version: '0.1.0',
    status: 'running',
  });
});

// --- Gestion des routes inconnues ---
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// --- Gestion centralisée des erreurs ---
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[VNR] Erreur non gérée :', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
