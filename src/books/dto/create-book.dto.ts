import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../schemas/book.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({type: String})
  @IsNotEmpty()
  @IsString()
  readonly category: Category;

}
