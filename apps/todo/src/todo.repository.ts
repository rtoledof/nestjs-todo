import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Todo } from './schema/todo.schema';

@Injectable()
export class TodoRepository extends AbstractRepository<Todo> {
  protected readonly logger = new Logger(TodoRepository.name);

  constructor(
    @InjectModel(Todo.name) todoModel: Model<Todo>,
    @InjectConnection() connection: Connection,
  ) {
    super(todoModel, connection);
  }
}
