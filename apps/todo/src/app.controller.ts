import { Body, Controller, Post, Get, UseGuards, Req, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoRequest } from './dto/create-todo.request';
import { JwtAuthGuard } from '@app/common/auth/jwt-auth.guard';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Body() request: CreateTodoRequest, @Req() req: any) {
    return this.appService.createTodo(request, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTodos(@Req() req: {user:{_id: string, username: string}}) {
    console.log(req.user);
    return this.appService.list({ user: req.user._id });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTodo(@Param('id') id: string, @Req() req: {user:{_id: string, username: string}}) {
    return this.appService.get({_id: id, user: req.user._id});
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async completeTodo(@Param('id') id: string, @Req() req: {user:{_id: string, username: string}}) {
    return this.appService.complete({_id: id, user: req.user._id});
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Req() req: {user:{_id: string, username: string}}) {
    return this.appService.delete({_id: id, user: req.user._id});
  }
}
