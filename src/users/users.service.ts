import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UserCreateDto, UserReadDto } from './dtos/users.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(userDto: UserCreateDto, roles: string[]): Promise<UserReadDto> {
    const userInternal = UserCreateDto.userCreateFromDto(userDto, roles);
    return await this.userRepository.save(userInternal);
  }

  async findAll(): Promise<UserReadDto[]> {
    return this.userRepository.findAll();
  }

  async findOneBy(id: number): Promise<UserReadDto> {
    const user = await this.userRepository.findBy('id', id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
