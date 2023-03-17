import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from '../dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async authenticate(
    authDto: AuthDto,
  ): Promise<Omit<User, 'password' | 'beforeInsert'> | null> {
    const user = await this.userService.findUserByEmail(authDto.login);

    if (!user || !(await bcrypt.compare(authDto.password, user.password))) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: Omit<User, 'password' | 'beforeInsert'>) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
