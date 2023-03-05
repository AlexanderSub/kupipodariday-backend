import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { IUserRequest } from 'src/types';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, req: IUserRequest) {
    await this.wishesRepository.save({
      ...createWishDto,
      owner: req.user,
    });
    return {};
  }

  async findLastWishes(): Promise<Wish[]> {
    return await this.wishesRepository.find({
      take: 40,
      order: { createdAt: 'DESC' },
    });
  }

  async findTopWishes(): Promise<Wish[]> {
    return await this.wishesRepository.find({
      take: 20,
      order: { copied: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.wishesRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
      },
    });
  }

  async find(arg: any) {
    return await this.wishesRepository.find(arg);
  }

  findAll() {
    return this.wishesRepository.find({
      relations: { owner: true, offers: true },
    });
  }

  async updateOne(
    wishId: number,
    updateWishDto: UpdateWishDto,
    userId: number,
  ) {
    const wish = await this.findOne(wishId);

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }

    if (userId !== wish.owner.id) {
      throw new ForbiddenException('Нельзя редактировать чужие подарки');
    }

    await this.wishesRepository.update(wishId, updateWishDto);
    return {};
  }

  async removeOne(wishId: number, userId: number) {
    const wish = await this.findOne(wishId);

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }

    if (userId !== wish.owner.id) {
      throw new ForbiddenException('Нельзя редактировать чужие подарки');
    }

    await this.wishesRepository.delete(wishId);
    return wish;
  }

  async copyWish(id: number, req: IUserRequest) {
    const wish = await this.findOne(id);
    await this.wishesRepository.update(id, { copied: ++wish.copied });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: wishId, createdAt, updatedAt, owner, ...rest } = wish;
    const newWish = {
      ...rest,
      raised: '0',
      copied: 0,
    };
    return this.create(newWish, req);
  }
}
