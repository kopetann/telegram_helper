import { BeforeInsert, Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { Config } from '../../common/config';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
  async beforeInsert() {
    const config: Config = new Config();
    this.password = await bcrypt.hash(this.password, config.get('SALT') ?? 10);
  }
}
