import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @Length(3)
  firstName: string;

  @ApiProperty()
  @Length(3)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  departmentId: string;
}
