import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth(): string {
    return `API alive @${new Date().toISOString()}`;
  }
}
