import { Book } from './types/Book';
import { LibraryBook } from './types/LibraryBook';

const book1: Book = { title: 'Мастер и Маргарита', author: 'Булгаков', year: 1967 };
const book2: Book = { title: '1984', author: 'Оруэлл', year: 1949 };

const lib1 = new LibraryBook(book1);
const lib2 = new LibraryBook(book2);

lib1.borrow('Иван');
lib2.borrow('Мария');