import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoModel.findByPk(id);
  }

  async create(todo: Todo): Promise<Todo> {
    return this.todoModel.create(todo);
  }

  async update(id: number, todo: Todo): Promise<[number, Todo[]]> {
    console.log('update--id ', id);
    const [affectedCount] = await this.todoModel.update(todo, {
      where: { id },
      returning: true,
    });
    const updatedTodos = await this.todoModel.findAll({ where: { id } });
    return [affectedCount, updatedTodos];
  }

  async remove(id: number): Promise<number> {
    const deletedTodoCount = await this.todoModel.destroy({
      where: { id },
    });
    return deletedTodoCount;
  }
}
