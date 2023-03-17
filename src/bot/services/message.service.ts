import { Injectable } from '@nestjs/common';
import { SendMessageDto } from '../dto/send.message.dto';
import { BotService } from './bot.service';
import { ConfigService } from '@nestjs/config';
import { decryptData } from '../../common/utils/encryption';

@Injectable()
export class MessageService {
  constructor(
    private readonly botService: BotService,
    private readonly configService: ConfigService,
  ) {}

  public async sendMessage(sendMessageDto: SendMessageDto) {
    const botToken = await this.botService
      .findBotById(sendMessageDto.botId)
      .then((res) => decryptData(res.token));

    console.log(botToken);
    //
    // const telegraf = new Telegraf(botToken);
    // for (const chatId of sendMessageDto.chatIds) {
    //   telegraf.telegram.sendMessage(chatId, sendMessageDto.message).then(
    //     () => {
    //       telegraf.launch();
    //     },
    //     (error) => {
    //       throw new InternalServerErrorException(
    //         `Error sending message: ${error}`,
    //       );
    //     },
    //   );
    // }
  }
}
