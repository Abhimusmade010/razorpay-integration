
// const router = require('express').Router();
import express from 'express'
const router = express.Router()
import { createOrder, verifyPayment } from '../controller/paymentController.js'

// Define your routes here

// router.get('/', (req, res) => {
//   res.send('Hello from the payment route!');
// }
// );
router.post('/createOrder', createOrder);
router.post('/verifyPayment', verifyPayment);

export default router;
