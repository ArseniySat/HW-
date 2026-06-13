// Задание 2 балла — Generics и утилитные типы

import { Book } from './types/Book';
import { LibraryBook } from './types/LibraryBook';

// ─── Repository<T> ───────────────────────────────────────────────────────────

class Repository<T> {
  private items: T[];

  constructor(initialItems: T[]) {
    this.items = initialItems;
  }

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

// ─── updateBook ──────────────────────────────────────────────────────────────

function updateBook(book: Book, updates: Partial<Book>): Book {
  return { ...book, ...updates };
}

// ─── getReadonlyBooks ─────────────────────────────────────────────────────────

function getReadonlyBooks(repo: Repository<Book>): Readonly<Book[]> {
  return repo.getAll();
}

// ─── Демонстрация ─────────────────────────────────────────────────────────────

const bookRepo = new Repository<Book>([
  { title: 'Мастер и Маргарита', author: 'Булгаков', year: 1967 },
  { title: 'Война и мир', author: 'Толстой', year: 1869 },
]);

bookRepo.add({ title: 'Идиот', author: 'Достоевский', year: 1869 });

console.log('Все книги:', bookRepo.getAll());

const updated = updateBook(
  { title: 'Идиот', author: 'Достоевский', year: 1869 },
  { year: 1868 }
);
console.log('Обновлённая книга:', updated);

const readonlyBooks = getReadonlyBooks(bookRepo);
console.log('Readonly книги:', readonlyBooks);

/*
  Пример кода, который выдаст ошибку TypeScript:
  readonlyBooks[0] = { title: 'Новая', author: 'Автор', year: 2024 };
  // Error: Index signature in type 'Readonly<Book[]>' only permits reading.
*/
