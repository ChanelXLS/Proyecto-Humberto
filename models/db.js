const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: 'Nacien1990',
  database: 'arroba'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

connection.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
});

module.exports = connection;
