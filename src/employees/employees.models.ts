import { DepartmentModel } from '@/departments/departments.models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<EmployeeModel>;
@Schema({
  collection: 'employees',
})
export class EmployeeModel {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DepartmentModel' })
  department: DepartmentModel;
}

export const EmployeeSchema = SchemaFactory.createForClass(EmployeeModel);
