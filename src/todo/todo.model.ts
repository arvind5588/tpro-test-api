import { Column, Model, Table, DataType } from 'sequelize-typescript';
interface TodoAttributes {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

type TodoType = Omit<Model<TodoAttributes>, keyof Model>;

@Table({ tableName: 'todos' })
export class Todo extends Model<TodoAttributes, TodoType> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  title: string;

  @Column({
    allowNull: false,
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM('active', 'inactive'),
    defaultValue: 'active',
  })
  status: 'active' | 'inactive';

  @Column({
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'updated_at',
  })
  updatedAt: Date;
}
