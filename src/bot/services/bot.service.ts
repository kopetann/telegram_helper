import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Bot } from '../entities/bot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBotDto } from '../dto/create.bot.dto';
import { UserService } from '../../user/services/user.service';
import { UpdateBotDto } from '../dto/update.bot.dto';
import { Telegraf } from 'telegraf';
import { decryptData } from '../../common/utils/encryption';
import { TelegramUpdate } from '../interfaces/telegram.update.interface';
import { ChannelService } from '../../channel/services/channel.service';
import { AddChannelDto } from '../../channel/dto/add.channel.dto';
import { AddChannelResponse } from '../../channel/interfaces/add.channel.response.interface';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot)
    private readonly botRepository: Repository<Bot>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly channelService: ChannelService,
  ) {}

  public async getBots(): Promise<Bot[]> {
    return await this.botRepository.find();
  }

  public async getMyBots(userId: string): Promise<Bot[]> {
    return this.botRepository.find({
      where: {
        userId,
      },
    });
  }

  public async getChatsFromUpdate(
    userId: string,
    botId: string,
  ): Promise<AddChannelResponse> {
    try {
      const bot = await this.findBotById(botId);
      const telegraf = new Telegraf(decryptData(bot.token));
      const channels: AddChannelDto[] = [];
      let update: TelegramUpdate;

      // @ts-ignore - there is some kind of mess with types - ask boss about this
      for (update of await telegraf.telegram.getUpdates(-1, 100, 0, [
        'chat_member',
      ])) {
        if (update.chat_member.new_chat_member.status === 'left') {
          continue;
        }

        channels.push({
          channelId: update.chat_member.chat.id,
          name: update.chat_member.chat.title,
        });
      }

      return await this.channelService.addChannels(userId, channels);
    } catch (e) {
      throw new InternalServerErrorException(`Error getting chats: ${e}`);
    }
  }

  public async findBotByName(name: string): Promise<Bot> {
    const bot = await this.botRepository.findOne({
      where: { name },
      relations: {
        user: true,
      },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    return bot;
  }

  public async findBotById(id: string): Promise<Bot> {
    const bot = await this.botRepository.findOne({ where: { id } });

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    return bot;
  }

  public async findBotsByIds(ids: string[]): Promise<Bot[]> {
    return await this.botRepository.find({
      where: { id: In(ids) },
      relations: {
        user: true,
      },
    });
  }

  public async createBot(createBotDto: CreateBotDto): Promise<Bot> {
    try {
      const bot = this.botRepository.create({ ...createBotDto });

      bot.user = await this.userService.findUserById(createBotDto.userId);

      return await this.botRepository.save(bot);
    } catch (error: any) {
      throw new Error(`Error during bot creation: ${error.message}`);
    }
  }

  public async updateBot(id: string, updateBotDto: UpdateBotDto): Promise<Bot> {
    try {
      const bot = await this.findBotById(id);
      if (updateBotDto.userId)
        bot.user = await this.userService.findUserById(updateBotDto.userId);

      Object.assign(bot, updateBotDto);
      return await this.botRepository.save(bot);
    } catch (error: any) {
      throw new Error(`Error during bot update: ${error.message}`);
    }
  }
}
