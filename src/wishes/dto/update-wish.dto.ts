import { PartialType } from '@nestjs/mapped-types';
import { CreateWishDto } from './create-wish.dto';
import { IsInt } from 'class-validator';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  @IsInt()
  raised?: number;
}
