import { PartialType } from '@nestjs/swagger';
import { AddChannelDto } from './add.channel.dto';

export class UpdateChannelDto extends PartialType(AddChannelDto) {}
