import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { EncodePassword, User } from './schema/user.schema';
import { RegisterUserRequest } from './dto/register-user.request';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(request: RegisterUserRequest) {
    const user = request as User;
    user.password = await EncodePassword(user.password);
    return this.userRepository.create(user);
  }

  async find(username: string): Promise<User | null> {
    const user = this.userRepository.findOne({ username: username });
    if (!user) {
      return null;
    }
    return user;
  }
}
