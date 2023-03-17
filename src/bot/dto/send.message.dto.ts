import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SendMessageDto {
  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  chatIds: string[];

  @ApiProperty()
  @IsUUID('all')
  botId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
