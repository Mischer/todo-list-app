import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../task/schemas/task.schema';

export class GroupResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the group',
    example: '61e8a3b1f0e4b3c1a2b4d5e6',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the group',
    example: 'Work Tasks',
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the group',
    example: 'Tasks related to work projects and meetings',
  })
  description?: string;

  @ApiProperty({
    description: 'List of tasks belonging to the group',
    type: [Task],
    example: [
      {
        id: '61e8a3b1f0e4b3c1a2b4d5e7',
        name: 'Buy groceries',
        description: 'Milk, bread, and eggs',
        completed: false,
        groupId: '61e8a3b1f0e4b3c1a2b4d5e6',
      },
    ],
  })
  tasks: Task[];
}