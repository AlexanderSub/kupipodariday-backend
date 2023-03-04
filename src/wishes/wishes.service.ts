import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  //Асинхронный, т.к. запрос к базе данных
  async createWish(createWishDto: CreateWishDto): Promise<Wish> {
    const wish = this.wishesRepository.create(createWishDto);

    return await this.wishesRepository.save(wish);
  }

  async findAll(): Promise<Wish[]> {
    return this.wishesRepository.find();
  }

  async findOne(id: number): Promise<Wish> {
    return this.wishesRepository.findOneBy({ id });
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    return this.wishesRepository.update({ id }, updateWishDto);
  }

  async removeOne(id: number) {
    return this.wishesRepository.delete({ id });
  }
}
