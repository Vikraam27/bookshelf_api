const routes = (handler) => [
  {
    method: 'POST',
    path: '/books',
    handler: handler.addBookHandler,
  },
];

module.exports = routes;
