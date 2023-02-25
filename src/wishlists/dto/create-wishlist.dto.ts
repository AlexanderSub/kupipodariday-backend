import { IsString, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(0, 250)
  name: string;

  @IsUrl()
  image: string;

  itemsId: number[];
}
