import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishList } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishList)
    private readonly wishlistRepository: Repository<WishList>,
  ) {}

  async createWishlist(
    createWishlistDto: CreateWishlistDto,
  ): Promise<WishList> {
    const wishlist = this.wishlistRepository.create(createWishlistDto);
    return this.wishlistRepository.save(wishlist);
  }

  async findOne(id: number): Promise<WishList> {
    return this.wishlistRepository.findOneBy({ id });
  }

  async findAll(): Promise<WishList[]> {
    return this.wishlistRepository.find();
  }

  async updateOne(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistRepository.update(id, updateWishlistDto);
  }

  async removeOne(id: number) {
    this.wishlistRepository.delete(id);
  }
}
