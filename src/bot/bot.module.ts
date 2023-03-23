import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bot } from './entities/bot.entity';
import { BotController } from './controllers/bot.controller';
import { BotService } from './services/bot.service';
import { UserModule } from '../user/user.module';
import { MessageService } from './services/message.service';
import { ChannelModule } from '../channel/channel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bot]),
    forwardRef(() => UserModule),
    ChannelModule,
  ],
  controllers: [BotController],
  providers: [BotService, MessageService],
  exports: [BotService, MessageService],
})
export class BotModule {}
