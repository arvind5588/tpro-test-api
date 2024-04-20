import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'todos' })
export class Todo extends Model<Todo> {
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
