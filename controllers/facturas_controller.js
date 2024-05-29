const db = require('../models/db');

exports.createOrder = (req, res) => {
  const { clienteId, productos } = req.body;
  const fecha = new Date();
  let total = 0;

  productos.forEach(product => {
    total += product.precioVenta * product.cantidad;
  });

  db.query('INSERT INTO FACTURAS (fecha, total, clienteId) VALUES (?, ?, ?)', [fecha, total, clienteId], (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    const facturaId = results.insertId;

    productos.forEach(product => {
      db.query('INSERT INTO PRODUCTOS_FACTURA (idFactura, idProducto, cantidad, precioVenta) VALUES (?, ?, ?, ?)', [facturaId, product.id, product.cantidad, product.precioVenta], err => {
        if (err) return res.status(500).send('Error on the server.');
      });
    });

    res.status(201).send({ message: 'Order created successfully!' });
  });
};

exports.getUserOrders = (req, res) => {
  const userId = req.userId;

  db.query('SELECT * FROM FACTURAS WHERE clienteId = ?', [userId], (err, results) => {
    if (err) return res.status(500).send('Error on the server.');
    res.status(200).send(results);
  });
};
