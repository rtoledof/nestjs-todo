import { Injectable } from '@nestjs/common';
import { CreateTodoRequest } from './dto/create-todo.request';
import { TodoRepository } from './todo.repository';
import { Todo } from './schema/todo.schema';
import { Types } from 'mongoose';

interface TodoFilter {
  user: string;
  _id: string;
  limit?: number;
  token?: string;
  completed?: boolean;
}

@Injectable()
export class AppService {
  constructor(private readonly todoRepository: TodoRepository) {}
  async createTodo(request: CreateTodoRequest, userID: string) {
    const todo: Todo = request as Todo;
    todo.user = userID;
    return this.todoRepository.create(todo);
  }

  async list(filter: TodoFilter) {
    return this.todoRepository.find(filter);
  }

  async get(filter: TodoFilter) {
    const _id = new Types.ObjectId(filter._id);
    return this.todoRepository.findOne({_id: _id, user: filter.user});
  }

  async complete(filter: TodoFilter) {
    const _id = new Types.ObjectId(filter._id);
    const todo = await this.todoRepository.findOne({_id: _id, user: filter.user});
    todo.completed = true;
    return this.todoRepository.findOneAndUpdate({_id: _id, user: filter.user}, todo);
  }

  async delete(filter: TodoFilter) {
    const _id = new Types.ObjectId(filter._id);
    return this.todoRepository.delete({_id: _id, user: filter.user});
  }
}
