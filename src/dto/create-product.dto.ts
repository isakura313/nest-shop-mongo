import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly img: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly discount: boolean;

  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly rating: number;
}
