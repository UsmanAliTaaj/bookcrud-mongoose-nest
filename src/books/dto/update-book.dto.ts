import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { Category } from '../schemas/book.schema';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly price: number;
  readonly category: Category;
}
