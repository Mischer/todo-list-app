
import {Controller, Get, Post, Patch, Delete, Body, Param, Query} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GroupResponseDto} from "./dto/group-response.dto";

@ApiTags('groups')
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @ApiQuery({
    name: 'extends',
    required: false,
    description: 'If true, includes tasks for each group',
    type: Boolean,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of groups, optionally with tasks if extends=true',
    type: [GroupResponseDto],
  })
  async findAll(@Query('extends') extendsParam?: string): Promise<GroupResponseDto[]> {
    const includeTasks = extendsParam === 'true';
    return this.groupService.findAllGroupsWithTasks(includeTasks);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the group along with its tasks',
    type: GroupResponseDto,
  })
  findOne(@Param('id') id: string): Promise<GroupResponseDto> {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
