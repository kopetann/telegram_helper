import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    login: string,
    password: string,
  ): Promise<Omit<User, 'password' | 'beforeInsert'>> {
    const user = await this.authService.authenticate({ login, password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
