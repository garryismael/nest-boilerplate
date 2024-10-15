import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModel, EmployeeSchema } from './employees.models';
import { EmployeeRepositoryImpl } from './employees.repository.impl';
import { DepartmentsModule } from '@/departments/departments.module';

@Module({
  imports: [
    DepartmentsModule,
    MongooseModule.forFeature([
      { name: EmployeeModel.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    {
      provide: 'EmployeeRepository',
      useClass: EmployeeRepositoryImpl,
    },
  ],
  exports: ['EmployeeRepository'],
})
export class EmployeesModule {}
