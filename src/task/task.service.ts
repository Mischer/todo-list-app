import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './repository/task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {ITaskFilter} from "./repository/interfaces/ITaskFilter";
import {Task} from "./schemas/task.schema";
import {CompleteTaskDto} from "./dto/complete-task.dto";
import {Types} from "mongoose";

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // TODO use mapper instead
    const task = {
      name: createTaskDto.name,
      description: createTaskDto.description,
      ...(createTaskDto.groupId ? {groupId: new Types.ObjectId(createTaskDto.groupId)} : {}),
    };
    return this.taskRepository.create(task);
  }

  async findAll(filter: ITaskFilter = {}): Promise<Task[]> {
    return this.taskRepository.findAll(filter);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.update(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async markTaskAsDone(id: string, completeTaskDto: CompleteTaskDto): Promise<Task> {
    const { completed } = completeTaskDto;
    const task = await this.taskRepository.update(id, { completed });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async remove(id: string): Promise<Task> {
    const task = await this.taskRepository.remove(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async removeTasksByGroupId(groupId: string): Promise<void> {
    await this.taskRepository.removeTasksByGroupId(groupId);
  }
}
