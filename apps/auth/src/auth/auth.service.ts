import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, ValidatePassword } from '../users/schema/user.schema';
import { JWT_SECRET } from './constants/services';
import { ConfigService } from '@nestjs/config';

export interface TokenPayload {
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<User | null> {
    const user = await this.userService.find(username);
    if (!user) {
      return null;
    }
    const passwordIsValid = await ValidatePassword(password, user.password);
    return passwordIsValid ? user : null;
  }

  login(user: User): { access_token: string } {
    const tokenPayload: TokenPayload = {
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(tokenPayload),
    };
  }

  async verify(token: string): Promise<User | null> {
    
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });

    const user = this.userService.find(decoded.username);

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }
}
