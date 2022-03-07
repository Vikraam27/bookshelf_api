const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class BookHandler {
  constructor({ controllers }) {
    this._controllers = controllers;

    this.addBookHandler = this.addBookHandler.bind(this);
    this.getAllBooksHanlder = this.getAllBooksHanlder.bind(this);
    this.getBookByIdHandler = this.getBookByIdHandler.bind(this);
    this.editBookHandler = this.editBookHandler.bind(this);
  }

  addBookHandler(request, h) {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    if (!name) {
      throw new InvariantError('Gagal menambahkan buku. Mohon isi nama buku');
    }
    if (readPage > pageCount) {
      throw new InvariantError('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
    }
    const bookId = this._controllers.addBookControllers({
      name, year, author, summary, publisher, pageCount, readPage, reading,
    });
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId,
      },
    });
    response.code(201);
    return response;
  }

  getAllBooksHanlder() {
    const books = this._controllers.getBooksControllers().map((data) => ({
      id: data.id,
      name: data.name,
      publisher: data.publisher,
    }));

    return {
      status: 'success',
      data: {
        books,
      },
    };
  }

  getBookByIdHandler(request) {
    const { id } = request.params;
    const book = this._controllers.getBookByIdControllers(id);

    if (!book) {
      throw new NotFoundError('Buku tidak ditemukan');
    }
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  editBookHandler(request) {
    const { id } = request.params;
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    if (!name) {
      throw new InvariantError('Gagal memperbarui buku. Mohon isi nama buku');
    }
    if (readPage > pageCount) {
      throw new InvariantError('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
    }
    const isBookExist = this._controllers.getBookByIdControllers(id);
    if (isBookExist) {
      this._controllers.editBookControllers({
        id, name, year, author, summary, publisher, pageCount, readPage, reading,
      });

      return {
        status: 'success',
        message: 'Buku berhasil diperbarui',
      };
    }
    throw new NotFoundError('Gagal memperbarui buku. Id tidak ditemukan');
  }
}

module.exports = BookHandler;
