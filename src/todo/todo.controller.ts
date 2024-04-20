// todo.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
}

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<ApiResponse<Todo>> {
    const todo = await this.todoService.findOne(+id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return { statusCode: HttpStatus.OK, message: 'Record found', data: todo };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() todo: Todo,
  ): Promise<[number, Todo[]]> {
    return this.todoService.update(+id, todo);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; message: string }> {
    const deletedCount = await this.todoService.remove(+id);
    if (deletedCount === 0) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Record has been deleted successfully',
    };
  }
}
