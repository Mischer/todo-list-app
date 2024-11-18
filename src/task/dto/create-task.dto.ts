import { IsString, IsNotEmpty, IsBoolean, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Name of the task',
    example: 'Buy groceries',
    maxLength: 64,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the task',
    example: 'Buy milk, bread, and eggs',
    maxLength: 256,
  })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Completion status of the task',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiPropertyOptional({
    description: 'ID of the group to which the task belongs',
    example: '61e8a3b1f0e4b3c1a2b4d5e6',
  })
  @IsString()
  @IsOptional()
  groupId?: string;
}
