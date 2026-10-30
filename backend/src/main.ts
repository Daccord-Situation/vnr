import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Point d'entrée du backend VNR.
 *
 * Sprint 0 — Incrément I1 : socle SaaS sécurisé.
 * Le backend est l'autorité finale pour toutes les décisions d'autorisation.
 *
 * Convention des deux perspectives (Phase A) :
 *   - Platform Side : exploitation de VNR par Daccord Situation.
 *   - Business Side  : gestion de l'activité de l'entreprise cliente (tenant).
 * Les routes métier seront préfixées par /platform et /business
 * dès leur implémentation (hors périmètre Sprint 0 validé).
 */
async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // CORS — à affiner selon l'origine du frontend lors de l'intégration.
  app.enableCors();

  // Arrêt propre (graceful shutdown) : utile pour la révocation immédiate
  // des connexions et mandats Support (règle A6 / invariant I05).
  app.enableShutdownHooks();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`VNR backend en écoute sur http://localhost:${port}`);
}

void bootstrap();
