import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.createOffer(createOfferDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.findOne(id);
  }

  @Patch(':id')
  async updateOffer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offersService.updateOne(id, updateOfferDto);
  }

  @Delete(':id')
  async deleteOffer(@Param('id', ParseIntPipe) id: number) {
    return this.offersService.removeOne(id);
  }
}
