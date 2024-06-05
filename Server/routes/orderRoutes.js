import express from 'express'
import {authenticate ,authorizeAdim} from '../middlewares/authMiddleware.js'
import {
    createOrder,
    getAllOrder,
    getUserOrders,
    countTotalOrders,
    calculateTotalSales,
    calculateTotalSalesByDate,
    findOrderById,
    markOrderPaid,
    markOrderdeliverd,
} from '../controllers/orderController.js'
const router = express.Router()

router.route('/')
      .post(authenticate ,createOrder)
      .get(authenticate,authorizeAdim,getAllOrder)

router.route('/mine').get(authenticate,getUserOrders)
router.route('/total-orders').get(countTotalOrders)
router.route('/total-sales').get(calculateTotalSales)
router.route('/total-sales-by-date').get(calculateTotalSalesByDate)
router.route('/:id').get(authenticate,findOrderById)
router.route('/:id/pay').put(authenticate,markOrderPaid)
router.route('/:id/deliver').put(authenticate,authorizeAdim,markOrderdeliverd)

export default router