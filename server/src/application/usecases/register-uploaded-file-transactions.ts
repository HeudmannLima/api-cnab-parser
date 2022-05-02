import { ITransactionsRepository } from '@src/application/repositories/ITransactionsRepository'
import { IReadBinaryProvider } from '@src/providers/ReadBinaryProvider/IReadBinaryProvider'

export class RegisterCNABTransactionsByUploadUsecase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private handleBinaryDataProvider: IReadBinaryProvider
  ) {}
  
  async execute(uploadedFilePath: string) {
    const base64Data = await this.handleBinaryDataProvider.readBinaryUploadedFileToString(uploadedFilePath)
    const data = this.handleBinaryDataProvider.readBinaryDataToString(base64Data)
    const dataArray = this.handleBinaryDataProvider.parseCNABTransacionData(data)

    const transactions = await this.transactionsRepository.registerTransactions(dataArray)

    return transactions
  }
}
