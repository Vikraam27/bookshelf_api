require('dotenv').config();

const Hapi = require('@hapi/hapi');

// books
const books = require('./api/books');
const BooksControllers = require('./controllers/booksControllers');

// exceptions
const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const booksControllers = new BooksControllers();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: books,
    options: {
      controllers: booksControllers,
    },
  });

  await server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const clientErrorResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      clientErrorResponse.code(response.statusCode);
      return clientErrorResponse;
    }

    const serverError = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    serverError.code(500);

    return response.continue || response;
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
