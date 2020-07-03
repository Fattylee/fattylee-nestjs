import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async getBooks(): Promise<Array<BookEntity>> {
    // const books: Array<BookDTO> = [{ name: 'book one' }, { name: 'book two' }];
    // const bookRep = this.bookRepository.create(books);
    // bookRep.unshift(this.bookRepository.create({ name: 'book three' }));
    // await this.bookRepository.save(bookRep);
    return await this.bookRepository.find();
  }
  async createBook(book: BookDTO): Promise<BookEntity> {
    const bookRep = this.bookRepository.create(book);
    return this.bookRepository.save(bookRep);
  }
}
