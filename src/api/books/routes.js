const routes = (handler) => [
  {
    method: 'POST',
    path: '/books',
    handler: handler.addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: handler.getAllBooksHanlder,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: handler.getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: handler.editBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: handler.deleteBookHandler,
  },
];

module.exports = routes;
