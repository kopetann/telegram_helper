import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Config } from './config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class DatabaseConfig implements TypeOrmOptionsFactory {
  private config: Config;

  constructor() {
    this.config = new Config();
  }

  createTypeOrmOptions(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.config.get('DB_HOST', 'localhost'),
      port: this.config.get('DB_PORT', 5432),
      username: this.config.get('DB_LOGIN'),
      password: this.config.get('DB_PASSWORD'),
      database: this.config.get('DB_NAME'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migration/*{.ts,.js}'],
      migrationsTableName: 'telegram_manager_migrations',
      migrationsRun: false,
    };
  }
}
