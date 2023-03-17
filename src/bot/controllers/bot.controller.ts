import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BotService } from '../services/bot.service';
import { Bot } from '../entities/bot.entity';
import { CreateBotDto } from '../dto/create.bot.dto';
import { UpdateBotDto } from '../dto/update.bot.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { MessageService } from '../services/message.service';
import { SendMessageDto } from '../dto/send.message.dto';

@Controller('bot')
@UseGuards(JwtAuthGuard)
export class BotController {
  constructor(
    private readonly botService: BotService,
    private readonly messageService: MessageService,
  ) {}

  @Post('message/send')
  public async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.messageService.sendMessage(sendMessageDto);
  }

  @Get('byName/:name')
  public async findBotByName(name: string): Promise<Bot> {
    return await this.botService.findBotByName(name);
  }

  @Get('byId/:id')
  public async findBotById(id: string): Promise<Bot> {
    return await this.botService.findBotById(id);
  }

  @Get()
  public async getBots(): Promise<Bot[]> {
    return await this.botService.getBots();
  }

  @Post()
  public async createBot(@Body() createBotDto: CreateBotDto): Promise<Bot> {
    return await this.botService.createBot(createBotDto);
  }

  @Patch(':id')
  public async updateBot(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBotDto: UpdateBotDto,
  ): Promise<Bot> {
    return await this.botService.updateBot(id, updateBotDto);
  }
}
