import { Controller, Get } from '@nestjs/common';
import { AppService, ServiceInfo } from './app.service';

/**
 * AppController — point d'entrée racine de l'API VNR.
 * GET / retourne les informations générales du service.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getInfo(): ServiceInfo {
    return this.appService.getInfo();
  }
}
