import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Channel } from '../entitities/channel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddChannelDto } from '../dto/add.channel.dto';
import { AddChannelResponse } from '../interfaces/add.channel.response.interface';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  public async getAll(): Promise<Channel[]> {
    return await this.channelRepository.find();
  }

  public async addChannels(
    userId: string,
    addChannelsDto: AddChannelDto[],
  ): Promise<AddChannelResponse> {
    try {
      const response: AddChannelResponse = {
        alreadyExist: [],
        added: [],
      };
      for (const channel of addChannelsDto) {
        const channelExists = await this.channelRepository.findOne({
          where: {
            externalId: channel.channelId,
            userId,
          },
        });

        if (channelExists) {
          response.alreadyExist.push(channelExists);
          continue;
        }

        const newChannel = this.channelRepository.create({
          externalId: channel.channelId,
          userId,
          name: channel.name,
        });
        response.added.push(await this.channelRepository.save(newChannel));
      }

      return response;
    } catch (error) {
      throw new InternalServerErrorException(`Error adding channels: ${error}`);
    }
  }

  public async getByUser(userId: string): Promise<Channel[]> {
    return await this.channelRepository.find({
      where: { userId },
    });
  }
}
