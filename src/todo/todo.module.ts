import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [SequelizeModule.forFeature([Todo]), AuthModule],
  controllers: [TodoController],
  providers: [TodoService, JwtAuthGuard],
})
export class TodoModule {}
