const bcrypt = require('bcryptjs');
const connection = require('../models/db');

exports.register = (req, res) => {
  const { nombre, password, direccion } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  connection.query('INSERT INTO clientes (nombre, direccion, password) VALUES (?, ?, ?)', [nombre, direccion, hashedPassword], (err, results) => {
    if (err) {
      console.error('Error en el servidor al registrar:', err);
      return res.status(500).send('Error en el servidor');
    }
    res.status(201).send({ message: 'Usuario registrado!' });
  });
};

exports.login = (req, res) => {
  const { nombre, password } = req.body;

  console.log('Intentando iniciar sesión con nombre:', nombre);

  connection.query('SELECT * FROM clientes WHERE nombre = ?', [nombre], (err, results) => {
    if (err) {
      console.error('Error en el servidor al buscar usuario:', err);
      return res.status(500).send('Error en el servidor al buscar usuario');
    }
    if (results.length === 0) {
      console.log('Usuario no encontrado');
      return res.status(404).send('Usuario no encontrado');
    }

    const user = results[0];
    console.log('Usuario encontrado:', user);

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      console.log('Contraseña no válida');
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id }, 'supersecret', { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  });
};
