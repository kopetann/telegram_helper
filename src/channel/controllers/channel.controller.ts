import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { ChannelService } from '../services/channel.service';
import { ExtractUser } from '../../user/decorators/extract.user.decorator';
import { User } from '../../user/entities/user.entity';
import { Channel } from '../entitities/channel.entity';
import { AddChannelDto } from '../dto/add.channel.dto';

@Controller('channel')
@UseGuards(JwtAuthGuard)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('my')
  public async getMyChannels(@ExtractUser() user: User): Promise<Channel[]> {
    return this.channelService.getByUser(user.id);
  }

  @Post()
  public async addChannels(
    @ExtractUser() user: User,
    @Body() addChannelsDto: AddChannelDto[],
  ) {
    return this.channelService.addChannels(user.id, addChannelsDto);
  }

  @Get()
  public async getChannels() {
    return await this.channelService.getAll();
  }
}
