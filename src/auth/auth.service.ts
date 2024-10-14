import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from '@/users/dtos/users.dto';
import { UserRepository } from '@/users/users.repository';
import { Roles } from '@/users/users.role';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return null;
    }

    const { password: encryptedPassword, ...result } = user;
    const isValidPassword = await bcrypt.compare(password, encryptedPassword);
    return isValidPassword ? result : null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async register(userDto: UserCreateDto) {
    return await this.usersService.create(userDto, [Roles.USER]);
  }
}
