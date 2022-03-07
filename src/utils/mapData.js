const mapData = (books) => books.map((data) => ({
  id: data.id,
  name: data.name,
  publisher: data.publisher,
}));

module.exports = mapData;
