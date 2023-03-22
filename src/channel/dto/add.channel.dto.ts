import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddChannelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  channelId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
