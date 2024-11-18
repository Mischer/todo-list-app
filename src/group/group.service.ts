
import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from './repository/group.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { TaskService } from '../task/task.service';
import {Group} from "./schemas/group.schema";
import {GroupResponseDto} from "./dto/group-response.dto";

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly taskService: TaskService
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupRepository.create(createGroupDto);
  }

  async findAllGroupsWithTasks(includeTasks: boolean): Promise<GroupResponseDto[]> {
    let groups = [];
    if (includeTasks) {
      groups = await this.groupRepository.findAllGroupsWithTasks();
    } else {
      groups = await this.groupRepository.findAll();
    }

    // TODO move logic to mapper
    return groups.map((group) => ({
      id: group._id,
      name: group.name,
      description: group.description,
      tasks: group.tasks || [],
    }));
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepository.findAll();
  }

  async findOne(id: string): Promise<GroupResponseDto> {
    const group = await this.groupRepository.findOne(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    const tasks = await this.taskService.findAll({groupId: id});
    return { ...group.toObject(), tasks };
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.update(id, updateGroupDto);
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async remove(id: string): Promise<Group> {
    const group = await this.groupRepository.remove(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    await this.taskService.removeTasksByGroupId(id);
    return group;
  }
}
