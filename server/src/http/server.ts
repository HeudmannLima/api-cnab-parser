import 'express-async-errors'
import { AppError } from '@src/http/errors/AppError'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from '@src/http/routes'
import loadDatabase from '@src/infrastructure/db/loadData'
import dotenv from 'dotenv'

dotenv.config()
loadDatabase()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, _request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})

app.listen(3333, () => {
  console.log(`[✔] Server Started on port ${process.env.PORT}`)
})
