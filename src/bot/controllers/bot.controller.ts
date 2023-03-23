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
import { ExtractUser } from '../../user/decorators/extract.user.decorator';
import { User } from '../../user/entities/user.entity';

@Controller('bot')
@UseGuards(JwtAuthGuard)
export class BotController {
  constructor(
    private readonly botService: BotService,
    private readonly messageService: MessageService,
  ) {}

  @Post('my/channels/update')
  public updateChannels(
    @ExtractUser() user: User,
    @Body('id', ParseUUIDPipe) botId: string,
  ) {
    return this.botService.getChatsFromUpdate(user.id, botId);
  }

  @Post('message/send')
  public sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.messageService.sendMessage(sendMessageDto);
  }

  @Get('byName/:name')
  public findBotByName(name: string): Promise<Bot> {
    return this.botService.findBotByName(name);
  }

  @Get('byId/:id')
  public findBotById(id: string): Promise<Bot> {
    return this.botService.findBotById(id);
  }

  @Patch(':id')
  public updateBot(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBotDto: UpdateBotDto,
  ): Promise<Bot> {
    return this.botService.updateBot(id, updateBotDto);
  }

  @Get()
  public getBots(): Promise<Bot[]> {
    return this.botService.getBots();
  }

  @Post()
  public createBot(@Body() createBotDto: CreateBotDto): Promise<Bot> {
    return this.botService.createBot(createBotDto);
  }
}
