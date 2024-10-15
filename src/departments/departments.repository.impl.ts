import { InjectModel } from '@nestjs/mongoose';
import { DepartmentRepository } from './departments.repository';
import { Department } from './entities/department.entity';
import { Model } from 'mongoose';
import { DepartmentDocument, DepartmentModel } from './departments.models';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentRepositoryImpl implements DepartmentRepository {
  constructor(
    @InjectModel(DepartmentModel.name)
    private departmentModel: Model<DepartmentModel>,
  ) {}

  async create(dto: CreateDepartmentDto): Promise<Department> {
    const departmentModel = new this.departmentModel(dto);
    return this.toDepartment(await departmentModel.save());
  }

  async findAll(): Promise<Department[]> {
    const dbDepartments = await this.departmentModel.find();
    return dbDepartments.map(this.toDepartment);
  }

  async findBy(
    key: string,
    value: number | string,
  ): Promise<Department | null> {
    const department = await this.departmentModel
      .findOne({
        [key]: value,
      })
      .exec();
    return department ? this.toDepartment(department) : null;
  }

  async findById(id: string): Promise<Department | null> {
    const department = await this.departmentModel.findById(id).exec();
    return department ? this.toDepartment(department) : null;
  }

  async existsBy(key: string, value: string): Promise<boolean> {
    const department = await this.departmentModel
      .exists({
        [key]: value,
      })
      .exec();
    return department ? true : false;
  }

  async update(id: string, dto: UpdateDepartmentDto): Promise<Department> {
    const department = await this.departmentModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return this.toDepartment(department);
  }

  async delete(id: string): Promise<void> {
    await this.departmentModel.deleteOne({
      _id: id,
    });
  }

  private toDepartment(doc: DepartmentDocument): Department {
    const department = new Department();
    department.id = doc._id.toString();
    department.name = doc.name;
    return department;
  }
}
