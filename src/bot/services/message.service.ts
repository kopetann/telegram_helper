import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendMessageDto } from '../dto/send.message.dto';
import { BotService } from './bot.service';
import { decryptData } from '../../common/utils/encryption';
import { Telegraf } from 'telegraf';

@Injectable()
export class MessageService {
  constructor(private readonly botService: BotService) {}

  public async sendMessage(sendMessageDto: SendMessageDto) {
    const botToken = await this.botService
      .findBotById(sendMessageDto.botId)
      .then((res) => decryptData(res.token));

    const telegraf = new Telegraf(botToken);
    for (const chatId of sendMessageDto.chatIds) {
      await telegraf.telegram.sendMessage(chatId, sendMessageDto.message).then(
        () => {},
        (error) => {
          throw new InternalServerErrorException(
            `Error sending message: ${error}`,
          );
        },
      );
    }
  }
}
