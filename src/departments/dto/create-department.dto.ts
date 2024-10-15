import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty()
  @Length(3)
  name: string;
}
