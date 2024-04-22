import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractDocument } from '@app/common';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ versionKey: false })
export class Todo extends AbstractDocument {
  @Prop()
  title!: string;

  @Prop()
  description!: string;

  @Prop()
  completed!: boolean;

  @Prop()
  user!: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
