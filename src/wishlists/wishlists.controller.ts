import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistsService } from './wishlists.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistService: WishlistsService) {}

  @Post()
  async createWishlist(@Body() createWishlistDto: CreateWishlistDto) {
    this.wishlistService.createWishlist(createWishlistDto);
  }

  @Get(':id')
  async findWishlist(@Param('id', ParseIntPipe) id: number) {
    return this.findWishlist(id);
  }

  @Patch(':id')
  async updateOffer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistService.updateOne(id, updateWishlistDto);
  }

  @Delete(':id')
  async deleteOffer(@Param('id', ParseIntPipe) id: number) {
    return this.wishlistService.removeOne(id);
  }
}
