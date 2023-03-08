import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class Config {
  private readonly configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
  }

  static get swaggerConfig() {
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

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'postgres',
      port: this.get('DB_PORT', 5432),
      username: this.get('DB_LOGIN'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_NAME'),
      entities: ['src/**/*.entity{.ts,.js}'],
      migrations: ['src/migration/*{.ts,.js}'],
      migrationsTableName: 'telegram_manager_migrations',
      migrationsRun: false,
    };
  }

  public getConfig(): Config {
    return this;
  }

  public get<T = any>(propertyKey: string, defaultProperty?: T): T | undefined {
    return this.configService.get(propertyKey, defaultProperty);
  }
}
