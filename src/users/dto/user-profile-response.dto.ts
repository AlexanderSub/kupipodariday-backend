import {
  IsDateString,
  IsEmail,
  IsInt,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UserProfileResponseDto {
  @IsInt()
  id: number;

  @IsString()
  @Length(1, 64)
  username: string;

  @IsString()
  @Length(1, 200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
