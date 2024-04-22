import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterUserRequest } from './dto/register-user.request';
import { UserService } from './user.service';
import { EncodePassword, User } from './schema/user.schema';
import { CurrentUser } from '../current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async register(@Body() request: RegisterUserRequest) {
    return this.userService.register(request as User);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
