import { Router } from 'express'
import TransactionsController from '@src/application/controllers/TransactionController'

const transactionsRouter = Router()
const transactionsController = new TransactionsController()

transactionsRouter.post('/register', transactionsController.register)
// transactionsRouter.get('/register', transactionsController.list)

export default transactionsRouter
