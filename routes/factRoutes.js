const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, orderController.createOrder);
router.get('/', verifyToken, orderController.getUserOrders);

module.exports = router;
