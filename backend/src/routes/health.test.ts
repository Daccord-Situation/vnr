import request from 'supertest';
import app from '../app';
import * as db from '../lib/db';

/**
 * Tests de la route GET /health.
 *
 * Sprint 0 — preuve : la route retourne HTTP 200 avec { status: "ok" }
 * lorsque la base de données est accessible.
 *
 * La connexion Prisma est mockée pour rendre les tests indépendants
 * d'une base de données réelle dans l'environnement CI/test.
 */
describe('GET /health', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('retourne HTTP 200 et { status: "ok" } quand la base est connectée', async () => {
    // Mock : connexion DB réussie
    jest
      .spyOn(db, 'checkDatabaseConnection')
      .mockResolvedValue({ connected: true });

    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('vnr-backend');
    expect(res.body.database.connected).toBe(true);
    expect(typeof res.body.timestamp).toBe('string');
    expect(typeof res.body.uptime).toBe('number');
  });

  it('retourne HTTP 503 et status "degraded" quand la base est inaccessible', async () => {
    // Mock : connexion DB échouée
    jest.spyOn(db, 'checkDatabaseConnection').mockResolvedValue({
      connected: false,
      error: 'Connection refused',
    });

    const res = await request(app).get('/health');

    expect(res.status).toBe(503);
    expect(res.body.status).toBe('degraded');
    expect(res.body.database.connected).toBe(false);
    expect(res.body.database.error).toBe('Connection refused');
  });

  it('retourne un timestamp ISO 8601 valide', async () => {
    jest
      .spyOn(db, 'checkDatabaseConnection')
      .mockResolvedValue({ connected: true });

    const res = await request(app).get('/health');
    const ts = res.body.timestamp as string;

    expect(new Date(ts).toISOString()).toBe(ts);
  });
});

describe('GET /', () => {
  it('retourne les informations de service', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.body.service).toBe('vnr-backend');
    expect(res.body.status).toBe('running');
  });
});

describe('Route inconnue', () => {
  it('retourne HTTP 404 pour une route inexistante', async () => {
    const res = await request(app).get('/route-inexistante');
    expect(res.status).toBe(404);
  });
});
