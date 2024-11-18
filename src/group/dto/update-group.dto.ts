
import { IsString, MaxLength } from 'class-validator';
import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateGroupDto {
  @ApiPropertyOptional({
    description: 'New name of the group',
    example: 'Update groceries list',
    maxLength: 64,
  })
  @IsString()
  @MaxLength(64)
  name?: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the group',
    example: 'Tasks related to work projects and meetings',
    maxLength: 256,
  })
  @IsString()
  @MaxLength(256)
  description?: string;
}
