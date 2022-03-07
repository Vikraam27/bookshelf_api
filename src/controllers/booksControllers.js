const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');

class BooksControllers {
  constructor() {
    this._books = [];
  }

  addBookControllers({
    name, year, author, summary, publisher, pageCount, readPage, reading,
  }) {
    const id = `book-${nanoid(6)}`;
    const insertedAt = new Date().toISOString();
    const isFinished = readPage === pageCount;
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: isFinished,
      reading,
      insertedAt,
      updatedAt: insertedAt,
    };
    this._books.push(newBook);

    const isSuccess = this._books.filter((book) => book.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Buku gagal ditambahkan');
    }
    return id;
  }

  getBooksControllers() {
    return this._books;
  }

  searchBookByNameControllers(name) {
    return this._books.filter((q) => q.name.toLowerCase().includes(name.toLowerCase()));
  }

  getReadedBooksControllers(isReaded) {
    return this._books.filter((q) => q.reading === isReaded);
  }

  getFinishedBooksControllers(isFinish) {
    return this._books.filter((q) => q.finished === isFinish);
  }

  getBookByIdControllers(id) {
    return this._books.filter((book) => book.id === id)[0];
  }

  editBookControllers({
    id, name, year, author, summary, publisher, pageCount, readPage, reading,
  }) {
    const updatedAt = new Date().toISOString();

    const index = this._books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this._books[index] = {
        ...this._books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
      };
    }
  }

  deleteBookControllers(id) {
    const index = this._books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this._books.splice(index, 1);
    }
  }
}

module.exports = BooksControllers;
