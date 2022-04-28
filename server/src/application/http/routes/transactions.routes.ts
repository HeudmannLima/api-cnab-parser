import { Router } from 'express'
import TransactionsController from '@src/application/controllers/TransactionController'

const transactionsRouter = Router()
const transactionsController = new TransactionsController()

transactionsRouter.get('/list', transactionsController.listAll)
transactionsRouter.get('/list/:client', transactionsController.listTransactionsByClient)

transactionsRouter.get('/resume', transactionsController.listResume)
transactionsRouter.get('/resume/:client', transactionsController.listResumeByClient)

transactionsRouter.post('/register', transactionsController.register)

export default transactionsRouter
