import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

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
            findById: jest.fn(),
            create: jest.fn(),
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

  it('should return all todo items', async () => {
    const todoItems: Todo[] = [
      {
        id: 1,
        title: 'Sample Todo',
        description: 'This is a sample',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Sample Todo1',
        description: 'This is a sample2',
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
