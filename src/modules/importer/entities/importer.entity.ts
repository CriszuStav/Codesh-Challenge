import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';

export type ImporterDocument = HydratedDocument<Importer>;

@Schema({ timestamps: true })
export class Importer {
  @Prop()
  name: string;

  @Prop({ default: Date.now() })
  createdAt?: Date;

  @Prop({ default: Date.now() })
  updatedAt?: Date;
}

export const ImporterSchema = SchemaFactory.createForClass(Importer);