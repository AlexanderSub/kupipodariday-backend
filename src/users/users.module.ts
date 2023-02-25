import { Module } from '@nestjs/common';
import { Users } from './users';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [Users, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
