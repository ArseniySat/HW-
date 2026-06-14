// types/LibraryBook.ts
import { Book } from './Book';
import { Borrowable } from './Borrowable';

export class LibraryBook implements Borrowable {
  info: Book;

  constructor(info: Book) {
    this.info = info;
  }

  borrow(userName: string): void {
    console.log(`Книга "${this.info.title}" выдана пользователю ${userName}`);
  }
}
