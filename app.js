const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); 

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo por el super puerto ${PORT}`);
});
