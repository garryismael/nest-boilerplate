import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { Roles } from '../users.role';

export class BaseUserDto {
  @ApiProperty()
  @Length(3)
  firstName: string;

  @ApiProperty()
  @Length(3)
  lastName: string;

  @ApiProperty()
  @Length(3)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

export class UserCreateDto extends BaseUserDto {
  @ApiProperty()
  @Length(3)
  password: string;

  static userCreateFromDto(
    dto: UserCreateDto,
    roles: string[],
  ): UserCreateInternal {
    const user = new UserCreateInternal();
    user.email = dto.email;
    user.username = dto.username;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.password = dto.password;
    user.roles = roles;
    return user;
  }
}

export class UserCreateInternal extends UserCreateDto {
  @ApiProperty({
    name: 'roles',
    enum: Roles,
  })
  roles: string[];
}

export class UserReadDto extends BaseUserDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    name: 'roles',
    enum: Roles,
  })
  roles: string[];
}
