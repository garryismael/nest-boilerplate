import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Department } from '@/departments/entities/department.entity';
import { EmployeeModel } from './employees.models';
import { GenericRepository } from '@/generic';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeRepositoryImpl
  implements GenericRepository<Employee, CreateEmployeeDto, UpdateEmployeeDto>
{
  constructor(
    @InjectModel(EmployeeModel.name)
    private employeeModel: Model<EmployeeModel>,
  ) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const employeeModel = new this.employeeModel({
      ...dto,
      department: new mongoose.Types.ObjectId(dto.departmentId),
    });
    const savedEmployee = await employeeModel.save();
    const employeeDb = await savedEmployee.populate('department');
    return this.toEmployee(employeeDb);
  }

  async findAll(): Promise<Employee[]> {
    const dbEmployees = await this.employeeModel
      .find()
      .populate('department')
      .exec();
    return dbEmployees.map(this.toEmployee);
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeModel
      .findOne({
        _id: id,
      })
      .populate('department')
      .exec();
    return employee ? this.toEmployee(employee) : null;
  }

  async findBy(key: string, value: number | string): Promise<Employee | null> {
    const employee = await this.employeeModel
      .findOne({
        [key]: value,
      })
      .populate('department')
      .exec();
    return employee ? this.toEmployee(employee) : null;
  }
  async existsBy(key: string, value: string): Promise<boolean> {
    const employee = await this.employeeModel
      .exists({
        [key]: value,
      })
      .exec();
    return employee ? true : false;
  }

  async update(id: string, dto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .populate('department');
    return this.toEmployee(employee);
  }

  async delete(id: string): Promise<void> {
    await this.employeeModel.deleteOne({
      _id: id,
    });
  }

  private toEmployee(data: any): Employee {
    const employee = new Employee();
    const department = new Department();
    employee.id = data._id;
    employee.firstName = data.firstName;
    employee.lastName = data.lastName;
    employee.email = data.email;
    department.id = data.department._id;
    department.name = data.department.name;
    employee.department = department;
    return employee;
  }
}
