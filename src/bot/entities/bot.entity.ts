import { CommonEntity } from '../../common/entities/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Config } from '../../common/config';
import { User } from '../../user/entities/user.entity';

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
    this.token = await bcrypt.hash(this.token, new Config().get('SALT') ?? 10);
  }
}
