import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';
import { BookEntity } from './book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks() {
    return this.bookService.getBooks();
  }
  @Post()
  async createBook(@Body(ValidationPipe) book: BookDTO): Promise<BookEntity> {
    return await this.bookService.createBook(book);
  }
}
