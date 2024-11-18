
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {Group} from "../../group/schemas/group.schema";

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true, maxlength: 64 })
  name: string;

  @Prop({ maxlength: 256 })
  description?: string;

  @Prop({ default: false })
  completed?: boolean;

  @Prop({ type: Types.ObjectId, ref: Group.name })
  groupId?: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ groupId: 1 }, { sparse: true });
