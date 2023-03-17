import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Bot } from '../entities/bot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBotDto } from '../dto/create.bot.dto';
import { UserService } from '../../user/services/user.service';
import { UpdateBotDto } from '../dto/update.bot.dto';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot)
    private readonly botRepository: Repository<Bot>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public async getBots(): Promise<Bot[]> {
    return await this.botRepository.find();
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

      if (createBotDto.userId)
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
      return await this.botRepository.save({
        ...bot,
        name: updateBotDto.name,
        token: updateBotDto.token,
      });
    } catch (error: any) {
      throw new Error(`Error during bot update: ${error.message}`);
    }
  }
}
