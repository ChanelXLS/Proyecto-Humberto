const db = require('../models/db');

exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM PRODUCTOS', (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    res.status(200).send(results);
  });
};

exports.getProductById = (req, res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM PRODUCTOS WHERE id = ?', [productId], (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    if (results.length === 0) return res.status(404).send('Product not found.');
    res.status(200).send(results[0]);
  });
};

exports.addProduct = (req, res) => {
  const { nombre, cantidad, precio } = req.body;
  db.query('INSERT INTO PRODUCTOS (nombre, cantidad, precio) VALUES (?, ?, ?)', [nombre, cantidad, precio], (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    res.status(201).send({ message: 'Product added successfully!' });
  });
};

exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const { nombre, cantidad, precio } = req.body;
  db.query('UPDATE PRODUCTOS SET nombre = ?, cantidad = ?, precio = ? WHERE id = ?', [nombre, cantidad, precio, productId], (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    res.status(200).send({ message: 'Product updated successfully!' });
  });
};