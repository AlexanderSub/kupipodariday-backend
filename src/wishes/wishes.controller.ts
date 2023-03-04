import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {} //Подключаем модуль, чтобы обращаться к методам из сервиса

  @Post()
  createWish(@Body() createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishesService.createWish(createWishDto);
  }

  @Get(':id')
  async findWish(@Param('id', ParseIntPipe) id: number) {
    return this.findWish(id);
  }

  @Patch(':id')
  async updateWish(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const wish = await this.wishesService.findOne(id);
    if (req.user.id !== wish.owner.id) {
      throw new NotFoundException('Это не ваше');
    }

    return this.wishesService.update(id, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wishesService.removeOne(id);
  }
}
