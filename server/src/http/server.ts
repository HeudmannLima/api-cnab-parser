import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from '@src/http/routes'
import { AppError } from './errors/AppError'
import dotenv from 'dotenv';


dotenv.config()
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
