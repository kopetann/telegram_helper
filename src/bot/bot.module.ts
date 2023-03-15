import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bot } from './entities/bot.entity';
import { BotController } from './controllers/bot.controller';
import { BotService } from './services/bot.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bot]), forwardRef(() => UserModule)],
  controllers: [BotController],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
