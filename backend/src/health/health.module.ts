import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

/**
 * HealthModule — module de contrôle de santé.
 *
 * Module autonome, sans dépendance métier ni base de données,
 * afin de rester disponible même si le reste de la plateforme est dégradé.
 */
@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
