import { Injectable } from '@nestjs/common';

/**
 * Résultat du contrôle de santé du service.
 */
export interface HealthCheckResult {
  /** État global du service. */
  status: 'ok' | 'degraded';
  /** Nom du service. */
  service: string;
  /** Horodatage ISO 8601 du contrôle. */
  timestamp: string;
  /** Disponibilité (uptime) en secondes depuis le démarrage du processus. */
  uptime: number;
  /** Environnement d'exécution (development | production | test). */
  environment: string;
  /** Version du package backend. */
  version: string;
}

/**
 * HealthService — vérification de l'état du backend VNR.
 *
 * Sprint 0 : contrôle de service simple (sans dépendance base de données,
 * la configuration PostgreSQL étant encore une proposition à valider).
 * Un ping base de données sera ajouté dès que la connexion Prisma sera
 * effective (Incrément I1 — lots suivants).
 */
@Injectable()
export class HealthService {
  private readonly startTime = Date.now();

  /**
   * Retourne l'état de santé du service.
   * En Sprint 0, le service est considéré "ok" tant que le processus répond.
   */
  check(): HealthCheckResult {
    return {
      status: 'ok',
      service: 'vnr-backend',
      timestamp: new Date().toISOString(),
      uptime: Math.round((Date.now() - this.startTime) / 1000),
      environment: process.env.NODE_ENV ?? 'development',
      version: '0.0.1',
    };
  }
}
