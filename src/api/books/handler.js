const ClientError = require('../../exceptions/ClientError');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const mapData = require('../../utils/mapData');

class BookHandler {
  constructor({ controllers }) {
    this._controllers = controllers;

    this.addBookHandler = this.addBookHandler.bind(this);
    this.getAllBooksHanlder = this.getAllBooksHanlder.bind(this);
    this.getBookByIdHandler = this.getBookByIdHandler.bind(this);
    this.editBookHandler = this.editBookHandler.bind(this);
    this.deleteBookHandler = this.deleteBookHandler.bind(this);
  }

  addBookHandler(request, h) {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    if (!name) {
      throw new ClientError('Gagal menambahkan buku. Mohon isi nama buku');
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

  getAllBooksHanlder(request) {
    const { name, reading, finished } = request.query;
    if (name) {
      const books = mapData(this._controllers.searchBookByNameControllers(name));

      return {
        status: 'success',
        data: {
          books,
        },
      };
    }

    if (reading) {
      if (reading === '0') {
        const books = mapData(this._controllers.getReadedBooksControllers(false));

        return {
          status: 'success',
          data: {
            books,
          },
        };
      }
      if (reading === '1') {
        const books = mapData(this._controllers.getReadedBooksControllers(true));

        return {
          status: 'success',
          data: {
            books,
          },
        };
      }
    }

    if (finished) {
      if (finished === '0') {
        const books = mapData(this._controllers.getFinishedBooksControllers(false));

        return {
          status: 'success',
          data: {
            books,
          },
        };
      }
      if (finished === '1') {
        const books = mapData(this._controllers.getFinishedBooksControllers(true));

        return {
          status: 'success',
          data: {
            books,
          },
        };
      }
    }

    const books = mapData(this._controllers.getBooksControllers());

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

  deleteBookHandler(request) {
    const { id } = request.params;

    const isBookExist = this._controllers.getBookByIdControllers(id);

    if (isBookExist) {
      this._controllers.deleteBookControllers(id);

      return {
        status: 'success',
        message: 'Buku berhasil dihapus',
      };
    }
    throw new NotFoundError('Buku gagal dihapus. Id tidak ditemukan');
  }
}

module.exports = BookHandler;
