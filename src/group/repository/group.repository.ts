
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from '../schemas/group.schema';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class GroupRepository {
  constructor(@InjectModel(Group.name) private readonly groupModel: Model<Group>) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupModel.create(createGroupDto);
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  async findAllGroupsWithTasks(): Promise<Group[]> {
    return this.groupModel.aggregate([
        {
          $lookup: {
            from: 'tasks',
            localField: '_id',
            foreignField: 'groupId',
            as: 'tasks',
          },
        },
      ]);
  }

  async findOne(id: string): Promise<Group> {
    return this.groupModel.findById(id).exec();
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupModel.findByIdAndUpdate(id, updateGroupDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Group> {
    return this.groupModel.findByIdAndDelete(id).exec();
  }
}
