
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group extends Document {
  @Prop({ required: true, maxlength: 64 })
  name: string;

  @Prop({ maxlength: 256 })
  description?: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
