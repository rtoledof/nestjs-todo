import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserRequest {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
