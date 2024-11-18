import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Name of the group',
    example: 'Work Tasks',
    maxLength: 64,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the group',
    example: 'Tasks related to work projects and meetings',
    maxLength: 256,
  })
  @IsString()
  @MaxLength(256)
  description?: string;
}