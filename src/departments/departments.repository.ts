import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

export interface DepartmentRepository {
  create(dto: CreateDepartmentDto): Promise<Department>;
  findAll(): Promise<Department[]>;
  findBy(key: string, value: number | string): Promise<Department | null>;
  findById(id: string): Promise<Department | null>;
  existsBy(key: string, value: string): Promise<boolean>;
  update(id: string, dto: UpdateDepartmentDto): Promise<Department>;
  delete(id: string): Promise<void>;
}

export const DepartmentRepository = Symbol('DepartmentRepository');
