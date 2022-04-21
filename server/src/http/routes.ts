import { Router } from 'express'
import transactionsRouter from '@src/application/http/routes/transactions.routes'

const routes = Router()

routes.use('/transactions', transactionsRouter)

export default routes
