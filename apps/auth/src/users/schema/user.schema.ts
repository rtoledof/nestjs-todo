import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

export type UserDocument = HydratedDocument<User>;

const saltOrRounds = 10;

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop()
  @IsString()
  @IsNotEmpty()
  username!: string;

  @Prop()
  @IsString()
  name!: string;

  @Prop()
  @IsString()
  @IsStrongPassword()
  password!: string;
}

export const EncodePassword = async (password: string): Promise<string> => {
  const logger = new Logger('BcryptEncoder');
  logger.debug(password);
  return await bcrypt.hash(password, saltOrRounds);
};

export const ValidatePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const UserSchema = SchemaFactory.createForClass(User);
