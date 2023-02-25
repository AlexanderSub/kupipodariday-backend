import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(1, 64)
  @IsOptional()
  username: string;

  @IsString()
  @Length(0, 200)
  @IsOptional()
  about?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @Min(2)
  @IsOptional()
  password: string;
}
