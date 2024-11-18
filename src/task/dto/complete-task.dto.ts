import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompleteTaskDto {
    @ApiProperty({
        description: 'Completion status of the task',
        example: true,
    })
    @IsBoolean()
    completed: boolean;
}