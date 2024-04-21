import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TodoController', () => {
  let controller: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all todo items', async () => {
      const todoItems: Todo[] = [
        {
          id: 1,
          title: 'Todo 1',
          description: 'Description for Todo 1',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Todo 2',
          description: 'Description for Todo 2',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(todoService, 'findAll').mockResolvedValue(todoItems);
      const result = await controller.findAll();
      expect(result).toEqual(todoItems);
    });
  });

  describe('create', () => {
    it('should create a new todo item', async () => {
      const newTodo: Todo = {
        id: 1,
        title: 'New Todo',
        description: 'Description for New Todo',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(todoService, 'create').mockResolvedValue(newTodo);
      const token = 'token';
      const result = await controller.create(newTodo, { user: { token } });
      expect(result).toEqual(newTodo);
    });

    it('should throw an error if authentication token is missing', async () => {
      const newTodo: Todo = {
        id: 1,
        title: 'New Todo',
        description: 'Description for New Todo',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        await controller.create(newTodo, {});
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
      }
    });
  });
});
