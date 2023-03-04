import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  async createOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    const offer = this.offersRepository.create(createOfferDto);
    return this.offersRepository.save(offer);
  }

  async findOne(id: number): Promise<Offer> {
    return this.offersRepository.findOneBy({ id });
  }

  async findAll(): Promise<Offer[]> {
    return this.offersRepository.find();
  }

  async updateOne(id: number, updateOfferDto: UpdateOfferDto) {
    return this.offersRepository.update({ id }, updateOfferDto);
  }

  async removeOne(id: number) {
    return this.offersRepository.delete({ id });
  }
}
