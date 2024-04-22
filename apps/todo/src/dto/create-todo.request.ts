import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoRequest {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  description!: string;

  @IsBoolean()
  completed: boolean = false;
}
