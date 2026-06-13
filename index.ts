// index.ts
import { LibraryBook } from './types/LibraryBook';

const book1 = new LibraryBook({
  title: 'Мастер и Маргарита',
  author: 'Михаил Булгаков',
  year: 1967,
});

const book2 = new LibraryBook({
  title: 'Преступление и наказание',
  author: 'Фёдор Достоевский',
  year: 1866,
});

book1.borrow('Иван');
book2.borrow('Мария');
