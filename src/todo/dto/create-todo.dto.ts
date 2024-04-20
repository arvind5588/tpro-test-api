export class CreateTodoDto {
  title: string;
  description: string;
  status: 'active' | 'inactive';
}
