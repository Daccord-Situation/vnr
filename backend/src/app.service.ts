import { Injectable } from '@nestjs/common';

/**
 * Informations renvoyées à la racine de l'API.
 */
export interface ServiceInfo {
  name: string;
  version: string;
  status: string;
}

/**
 * AppService — informations générales sur le backend VNR.
 */
@Injectable()
export class AppService {
  getInfo(): ServiceInfo {
    return {
      name: 'VNR Backend',
      version: '0.0.1',
      status: 'running',
    };
  }
}
