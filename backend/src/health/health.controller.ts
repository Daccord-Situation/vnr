import { Controller, Get } from '@nestjs/common';
import { HealthService, HealthCheckResult } from './health.service';

/**
 * HealthController — point de contrôle de santé du backend.
 *
 * Route : GET /health
 * Utilisée pour vérifier que l'API est en ligne (preuve Sprint 0 au 22/10).
 */
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check(): HealthCheckResult {
    return this.healthService.check();
  }
}
