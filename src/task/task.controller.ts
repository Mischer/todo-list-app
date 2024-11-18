
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {Task} from "./schemas/task.schema";
import {CompleteTaskDto} from "./dto/complete-task.dto";

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Patch(':id/done')
  @ApiResponse({
    status: 200,
    description: 'Marks the task as completed or not completed',
    type: Task,
  })
  async markAsDone(@Param('id') id: string, @Body() completeTaskDto: CompleteTaskDto): Promise<Task> {
    return this.taskService.markTaskAsDone(id, completeTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Task> {
    return this.taskService.remove(id);
  }
}
