import { Department } from '@/departments/entities/department.entity';

export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
}
