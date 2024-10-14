import { UserCreateInternal, UserReadDto } from './dtos/users.dto';
import { User } from './users.entity';

export interface UserRepository {
  save(user: UserCreateInternal): Promise<UserReadDto>;
  findAll(): Promise<UserReadDto[]>;
  findBy(key: string, value: number | string): Promise<UserReadDto | null>;
  findByUsername(id: string): Promise<User | null>;
  existsBy(key: string, value: string): Promise<boolean>;
}

export const UserRepository = Symbol('UserRepository');
