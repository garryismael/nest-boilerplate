import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './users.entity';
import { UserSchema } from './users.model';
import { UserRepository } from './users.repository';
import { UserRepositoryImpl } from './users.repository.impl';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  controllers: [UsersController],
  exports: [UserRepository, UsersService],
})
export class UsersModule {}
