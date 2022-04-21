import { Request, Response } from 'express'
import { RegisterCNABTransactionsUsecase } from '@src/application/usecases/register-transactions-data'
import { TransactionsRepository } from '@src/application/http/repositories/TransactionsRepository'
import { AppError } from '@src/http/errors/AppError'

export default class TransactionController {
  public async register(request: Request, response: Response): Promise<Response> {
    const { fileData } = request.body
    
    const registerTransaction = new RegisterCNABTransactionsUsecase(
      new TransactionsRepository()
    )

    try {
      const res = await registerTransaction.execute(fileData)
      const data = res.map(data => data.properties)

      return response.json(data)
    } catch (error) {
      throw new AppError(`Error on registrer CNAB transactions.`)
    }
  }
}
