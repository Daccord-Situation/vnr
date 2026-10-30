import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

/**
 * Premier test basique (preuve Sprint 0) : le HealthController
 * expose une route GET /health qui retourne l'état du service.
 */
describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check()', () => {
    it('should return status "ok"', () => {
      const result = controller.check();
      expect(result.status).toBe('ok');
    });

    it('should return the service name "vnr-backend"', () => {
      const result = controller.check();
      expect(result.service).toBe('vnr-backend');
    });

    it('should return a valid ISO 8601 timestamp', () => {
      const result = controller.check();
      // Une date ISO valide doit pouvoir être reconstruite à l'identique.
      expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
    });

    it('should return a non-negative uptime', () => {
      const result = controller.check();
      expect(result.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should return an environment value', () => {
      const result = controller.check();
      expect(result.environment).toBeDefined();
      expect(typeof result.environment).toBe('string');
    });
  });
});
