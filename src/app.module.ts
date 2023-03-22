import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './common/database.config';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: undefined,
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UserModule,
    BotModule,
    ChannelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
