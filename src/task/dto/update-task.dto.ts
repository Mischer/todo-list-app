
import { IsString, IsBoolean, MaxLength, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'New name of the task',
    example: 'Update groceries list',
    maxLength: 64,
  })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated description of the task',
    example: 'Buy milk, bread, eggs, and butter',
    maxLength: 256,
  })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  description?: string;
}