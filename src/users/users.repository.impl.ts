import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserReadDto, UserCreateInternal } from './dtos/users.dto';
import { User } from './users.entity';
import { UserModel, UserDocument } from './users.model';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserModel>,
  ) {}

  async findAll(): Promise<UserReadDto[]> {
    const dbUsers = await this.userModel.find();
    return dbUsers.map(this.toUserRead);
  }

  async save(userDto: UserCreateInternal): Promise<UserReadDto> {
    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);
    userDto.password = encryptedPassword;
    const userModel = new this.userModel(userDto);
    return this.toUserRead(await userModel.save());
  }

  async findBy(
    key: string,
    value: number | string,
  ): Promise<UserReadDto | null> {
    const userEntity = await this.userModel
      .findOne({
        [key]: value,
      })
      .exec();
    return userEntity ? this.toUserRead(userEntity) : null;
  }

  async findByUsername(username: string) {
    const userDb = await this.userModel
      .findOne({
        username,
      })
      .exec();
    return userDb ? this.toUser(userDb) : null;
  }

  async existsBy(key: string, value: string): Promise<boolean> {
    const user = await this.userModel
      .exists({
        [key]: value,
      })
      .exec();
    return user ? true : false;
  }

  private toUserRead(data: UserDocument): UserReadDto {
    const userRead = new UserReadDto();
    userRead.id = data._id.toString();
    userRead.email = data.email;
    userRead.username = data.username;
    userRead.firstName = data.firstName;
    userRead.lastName = data.lastName;
    userRead.roles = data.roles;
    return userRead;
  }

  private toUser(data: UserDocument): User {
    const userRead = new User();
    userRead.id = data._id.toString();
    userRead.email = data.email;
    userRead.username = data.username;
    userRead.firstName = data.firstName;
    userRead.lastName = data.lastName;
    userRead.password = data.password;
    userRead.roles = data.roles;
    return userRead;
  }
}
