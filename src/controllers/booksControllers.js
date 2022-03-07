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
}

module.exports = BooksControllers;
