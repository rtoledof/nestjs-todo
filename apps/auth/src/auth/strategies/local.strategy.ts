import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../users/schema/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ username: 'username' });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validate(username, password);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
