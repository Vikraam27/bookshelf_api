const InvariantError = require('../../exceptions/InvariantError');

class BookHandler {
  constructor({ controllers }) {
    this._controllers = controllers;

    this.addBookHandler = this.addBookHandler.bind(this);
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
}

module.exports = BookHandler;
