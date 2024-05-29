const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, productController.getAllProducts);
router.get('/:id', verifyToken, productController.getProductById);
router.post('/', verifyToken, productController.addProduct);
router.put('/:id', verifyToken, productController.updateProduct);

module.exports = router;
