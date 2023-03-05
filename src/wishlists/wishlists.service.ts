import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async createWishlist(
    createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    const wishlist = this.wishlistRepository.create(createWishlistDto);
    return this.wishlistRepository.save(wishlist);
  }

  async findOne(id: number): Promise<Wishlist> {
    return this.wishlistRepository.findOneBy({ id });
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  async updateOne(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistRepository.update(id, updateWishlistDto);
  }

  async removeOne(id: number) {
    this.wishlistRepository.delete(id);
  }
}
