const db = require('../utilities/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
      return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES(?, ?, ?, ?)' ,
          [this.title, this.price, this.description, this.imageUrl]
     );
  }

   updateById(id) {
   return db.execute('UPDATE products SET title = ?, price = ? , description = ?, imageUrl = ? WHERE products.id = ?',
       [this.title, this.price, this.description, this.imageUrl, id]
  );
}

  static deleteById(id) {
   return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
 }

  static fetchAll() {
     return db.execute('SELECT * FROM products');
  }

  static findById(id) {
     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
