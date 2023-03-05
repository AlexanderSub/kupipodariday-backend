import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUserRequest } from 'src/types';
import { SensitiveDataInterceptor } from 'src/interceptors/sensitive-data.interceptor';

@UseInterceptors(SensitiveDataInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  asyncfind(@Req() req: IUserRequest) {
    return this.usersService.findById(req.user.id);
  }

  @Patch('me')
  update(@Req() req: IUserRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateById(req.user.id, updateUserDto);
  }

  @Get(':username')
  findUserByName(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Post('find')
  findMany(@Body() findUser: FindUserDto) {
    return this.usersService.findMany(findUser);
  }

  @Get('me/wishes')
  getOwnWishes(@Req() req: IUserRequest): Promise<Wish[]> {
    return this.usersService.getUsersWishes(req.user.id);
  }

  @Get(':username/wishes')
  async getUsersWishes(@Param('username') username: string): Promise<Wish[]> {
    const user = await this.usersService.findByUsername(username);
    return await this.usersService.getUsersWishes(user.id);
  }
}
