const BookHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'books',
  version: '1.0.0',
  register: async (server, { controllers }) => {
    const bookHandler = new BookHandler({ controllers });
    server.route(routes(bookHandler));
  },
};
