import { EmployeeModel } from '@/employees/employees.models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type DepartmentDocument = HydratedDocument<DepartmentModel>;
@Schema({
  collection: 'departments',
})
export class DepartmentModel {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }] })
  employees: EmployeeModel[];
}

export const DepartmentSchema = SchemaFactory.createForClass(DepartmentModel);
