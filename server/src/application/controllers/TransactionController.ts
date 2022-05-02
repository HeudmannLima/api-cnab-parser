import { Request, Response } from 'express'
import { RegisterCNABTransactionsUsecase } from '@src/application/usecases/register-transactions'
import { TransactionsRepository } from '@src/application/http/repositories/TransactionsRepository'
import { ListCNABTransactionsUsecase } from '@src/application/usecases/list-all-transactions'
import { ListResumeCNABTransactionsUsecase } from '@src/application/usecases/list-all-resume-transactions'
import { ReadBinaryProvider } from '@src/providers/ReadBinaryProvider/implementations/ReadBinaryProvider'
import { ListCNABTransactionsByClientUsecase } from '@src/application/usecases/list-transactions-by-client'
import { ListResumeCNABTransactionsByClientUsecase } from '@src/application/usecases/list-resume-by-client'
import { AppError } from '@src/http/errors/AppError'
import { RegisterCNABTransactionsByUploadUsecase } from '../usecases/register-uploaded-file-transactions'

export default class TransactionController {

  public async register(request: Request, response: Response): Promise<Response> {
    const { fileData } = request.body 

    const registerTransaction = new RegisterCNABTransactionsUsecase(
      new TransactionsRepository(), 
      new ReadBinaryProvider()
    )

    try {
      await registerTransaction.execute(fileData)

      return response.status(200).json({ message: `CNAB Data registered with success.`});
    } catch (error) {
      throw new AppError(`Error on registrer CNAB transactions. ${error}`)
    }
  }

  public async registerFile(request: Request, response: Response): Promise<Response> {
    const registerUploadTransaction = new RegisterCNABTransactionsByUploadUsecase(
      new TransactionsRepository(), 
      new ReadBinaryProvider()
    )

    const file: Express.Multer.File = request?.file!

    if (!file || !file.originalname.endsWith('.txt') || !file.mimetype.includes('text/plain')) {
      return response.status(400).json(`Error on registrer CNAB transactions from an invalid file data.`)
    }

    try {
      await registerUploadTransaction.execute(file.path)

    } catch (error) {
      throw new AppError(`Error on registrer CNAB transactions from file. ${error}`)
    }

    return response.status(200).json({ message: `CNAB file data registered with success.`})
  }

  public async listAll(_request: Request, response: Response): Promise<Response> {
    const listAllTransaction = new ListCNABTransactionsUsecase(new TransactionsRepository())

    try {
      const result = await listAllTransaction.execute()

      return response.status(200).json({ message: result })
    } catch (error) {
      throw new AppError(`Error on list all CNAB transactions.`)
    }
  }

  public async listTransactionsByClient(request: Request, response: Response): Promise<Response> {
    const { client } = request.params
    const listAllTransaction = new ListCNABTransactionsByClientUsecase(new TransactionsRepository())

    try {
      const result = await listAllTransaction.execute(client)

      return response.status(200).json({ message: result })
    } catch (error) {
      throw new AppError(`Error on list client CNAB transactions.`)
    }
  }

  public async listResume(_request: Request, response: Response): Promise<Response> {
    const listAllTransaction = new ListCNABTransactionsUsecase(new TransactionsRepository())
    const listResumeAllTransaction = new ListResumeCNABTransactionsUsecase(new ReadBinaryProvider())

    try {
      const allTransactions = await listAllTransaction.execute()
      const resumeList = await listResumeAllTransaction.execute(allTransactions)

      return response.status(200).json({ message: resumeList })
    } catch (error) {
      throw new AppError(`Error on list resume all CNAB transactions.`)
    }
  }

  public async listResumeByClient(request: Request, response: Response): Promise<Response> {
    const { client } = request.params
    const listClientTransactions = new ListCNABTransactionsByClientUsecase(new TransactionsRepository())
    const listClientResume = new ListResumeCNABTransactionsByClientUsecase(new ReadBinaryProvider())

    try {
      const clientCNABData = await listClientTransactions.execute(client)
      const resume = await listClientResume.execute(clientCNABData)

      return response.status(200).json({ message: resume })
    } catch (error) {
      throw new AppError(`Error on resume client transactions.`)
    }
  }
}
