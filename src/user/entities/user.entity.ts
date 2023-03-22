import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { Config } from '../../common/config';
import * as bcrypt from 'bcrypt';
import { Bot } from '../../bot/entities/bot.entity';
import { Channel } from '../../channel/entitities/channel.entity';
import { UserRole } from '../enums/user.role';

@Entity('user')
export class User extends CommonEntity {
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  phoneNumber: string;

  @Column('enum', { enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Bot, (bot) => bot.user)
  bots: Bot[];

  @OneToMany(() => Channel, (channel) => channel.user)
  channels: Channel[];

  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(
      this.password,
      new Config().get('SALT') ?? 10,
    );
  }
}
