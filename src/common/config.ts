import { ConfigService } from '@nestjs/config';

export class Config {
  private readonly configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
  }

  public get<T = any>(propertyKey: string, defaultProperty?: T): T | undefined {
    return this.configService.get(propertyKey, defaultProperty);
  }
}
