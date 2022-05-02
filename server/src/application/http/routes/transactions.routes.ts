import { Router } from 'express'
import multer from 'multer'

import TransactionsController from '@src/application/controllers/TransactionController'

const transactionsRouter = Router()
const transactionsController = new TransactionsController()

transactionsRouter.get('/list', transactionsController.listAll)
transactionsRouter.get('/list/:client', transactionsController.listTransactionsByClient)
transactionsRouter.get('/resume', transactionsController.listResume)
transactionsRouter.get('/resume/:client', transactionsController.listResumeByClient)
transactionsRouter.post('/register', transactionsController.register)
transactionsRouter.post(
  '/register/file', 
  multer({ dest: './'}).single('file'), 
  transactionsController.registerFile
)

export default transactionsRouter
