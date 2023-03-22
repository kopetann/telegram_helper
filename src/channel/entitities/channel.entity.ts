import { CommonEntity } from '../../common/entities/common.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Bot } from '../../bot/entities/bot.entity';

@Entity('channels')
export class Channel extends CommonEntity {
  @Column()
  name: string;

  @Column()
  externalId: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User, (user) => user.channels, {
    cascade: true,
  })
  user: User;

  @ManyToMany(() => Bot, (bot) => bot.channels)
  bots: Bot[];
}
