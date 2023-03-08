import { ConfigService } from '@nestjs/config';

export class Config {
  private readonly configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
  }

  static get swagger() {
    return {
      title: 'telegram_helper',
      description: 'The telegram_helper API description',
      version: '1.0',
      basePath: '/',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
    };
  }

  public getConfig(): Config {
    return this;
  }

  public get<T = any>(propertyKey: string, defaultProperty: T): any {
    this.configService.get(propertyKey, defaultProperty);
  }
}
