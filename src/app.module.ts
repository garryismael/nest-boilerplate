import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongodbModule } from './db/mongodb/mongodb.module';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.production.local'],
      load: [configuration],
      isGlobal: true,
    }),
    MongodbModule,
    EmployeesModule,
    DepartmentsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
