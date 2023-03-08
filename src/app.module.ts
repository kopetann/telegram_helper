import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './common/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => new Config().getTypeOrmConfig(),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
