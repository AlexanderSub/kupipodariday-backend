import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    const { password, ...result } = user;
    const hash = await bcrypt.hash(password, 10);
    return await this.usersRepository.save({ password: hash, ...result });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user;
  }

  async findByUsername(username: string, password = false): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect(password ? 'user.password' : '')
      .where('user.username = :username', { username })
      .getOne();
    return user;
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update({ id }, { ...updateUserDto });
  }

  async findMany({ query }: FindUserDto): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: [{ email: query }, { username: query }],
    });
    if (!users) {
      throw new NotFoundException('Пользователь не найден');
    }
    return users;
  }
}
