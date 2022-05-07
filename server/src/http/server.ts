import 'express-async-errors'
import { AppError } from '@src/http/errors/AppError'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from '@src/http/routes'
import loadDatabase from '@src/infrastructure/db/loadData'
import dotenv from 'dotenv'
import { swaggerDocs } from '@src/docs/swagger'

dotenv.config()
loadDatabase()

const port = Number(process.env.PORT)
const webPort = Number(process.env.WEB_PORT)
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
    message: 'Internal Server Error',
  })
})

app.listen(port, () => {
  console.warn(`\n[✔] Server Started on port ${port}`)
  console.warn(`[✔] Frontend available at http://localhost:8080`)
  swaggerDocs(app, port)
})
