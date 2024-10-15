import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentRepository } from './departments.repository';

@Injectable()
export class DepartmentsService {
  constructor(
    @Inject(DepartmentRepository)
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepository.create(createDepartmentDto);
  }

  findAll() {
    return this.departmentRepository.findAll();
  }

  async findOne(id: string) {
    const department = await this.departmentRepository.findById(id);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.findOne(id);
    return this.departmentRepository.update(department.id, updateDepartmentDto);
  }

  async remove(id: string) {
    const department = await this.findOne(id);
    await this.departmentRepository.delete(department.id);
  }
}
