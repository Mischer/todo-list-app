
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Task, TaskDocument} from '../schemas/task.schema';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import {ITaskFilter} from "./interfaces/ITaskFilter";
import {CompleteTaskDto} from "../dto/complete-task.dto";

@Injectable()
export class TaskRepository {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

  async create(task: Partial<TaskDocument>): Promise<Task> {
    return this.taskModel.create(task);
  }

  async findAll(filter: ITaskFilter = {}): Promise<Task[]> {
    return this.taskModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto | CompleteTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  async removeTasksByGroupId(groupId: string): Promise<void> {
    await this.taskModel.deleteMany({ groupId }).exec();
  }
}
