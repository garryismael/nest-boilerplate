import { DepartmentsService } from '@/departments/departments.service';
import { GenericRepository } from '@/generic';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject('EmployeeRepository')
    private readonly employeeRepository: GenericRepository<
      Employee,
      CreateEmployeeDto,
      UpdateEmployeeDto
    >,
    private readonly departmentService: DepartmentsService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    await this.departmentService.findOne(createEmployeeDto.departmentId);
    return this.employeeRepository.create(createEmployeeDto);
  }

  findAll() {
    return this.employeeRepository.findAll();
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    if (updateEmployeeDto.departmentId) {
      await this.departmentService.findOne(updateEmployeeDto.departmentId);
    }
    const employee = await this.findOne(id);
    return this.employeeRepository.update(employee.id, updateEmployeeDto);
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    await this.employeeRepository.delete(employee.id);
  }
}
