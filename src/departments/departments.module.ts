import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModel, DepartmentSchema } from './departments.models';
import { DepartmentRepository } from './departments.repository';
import { DepartmentRepositoryImpl } from './departments.repository.impl';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DepartmentModel.name, schema: DepartmentSchema },
    ]),
  ],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    {
      provide: DepartmentRepository,
      useClass: DepartmentRepositoryImpl,
    },
  ],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
