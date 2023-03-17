import { CommonEntity } from '../../common/entities/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { encryptData } from '../../common/utils/encryption';
import { InternalServerErrorException } from '@nestjs/common';

@Entity('bots')
export class Bot extends CommonEntity {
  @Column()
  name: string;

  @Column()
  token: string;

  @ManyToOne(() => User, (user) => user.bots)
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  async hashToken() {
    try {
      this.token = encryptData(this.token);
    } catch (e) {
      throw new InternalServerErrorException(`Error encrypting token: ${e}`);
    }
  }
}
