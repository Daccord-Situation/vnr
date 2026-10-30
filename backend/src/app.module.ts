import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';

/**
 * AppModule — module racine du backend VNR.
 *
 * Les modules Platform Side et Business Side seront importés ici
 * dès leur implémentation (hors périmètre Sprint 0 validé) :
 *   - PlatformModule  → exploitation de VNR (Daccord Situation)
 *   - BusinessModule  → gestion de l'activité de l'entreprise cliente
 */
@Module({
  imports: [HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
