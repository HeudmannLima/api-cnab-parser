import { Router } from 'express'
import TransactionsController from '@src/application/controllers/TransactionController'

const transactionsRouter = Router()
const transactionsController = new TransactionsController()

transactionsRouter.post('/register', transactionsController.register)

transactionsRouter.get('/list', transactionsController.listAll)
transactionsRouter.get('/list/:client', transactionsController.listTransactionsByClient)

transactionsRouter.get('/resume', transactionsController.listResume)
transactionsRouter.get('/resume/:client', transactionsController.listResumeByClient)

export default transactionsRouter
