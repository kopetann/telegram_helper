import { CommonEntity } from '../../common/entities/common.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { encryptData } from '../../common/utils/encryption';
import { InternalServerErrorException } from '@nestjs/common';
import { Channel } from '../../channel/entitities/channel.entity';

@Entity('bots')
export class Bot extends CommonEntity {
  @Column()
  name: string;

  @Column()
  token: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, (user) => user.bots)
  user: User;

  @ManyToMany(() => Channel, (channel) => channel.bots)
  channels: Channel[];

  @BeforeInsert()
  @BeforeUpdate()
  private hashToken() {
    try {
      this.token = encryptData(this.token);
    } catch (e) {
      throw new InternalServerErrorException(`Error encrypting token: ${e}`);
    }
  }
}
