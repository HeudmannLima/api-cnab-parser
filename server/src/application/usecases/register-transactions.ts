import { ITransactionsRepository } from '@src/application/repositories/ITransactionsRepository'
import { IReadBinaryProvider } from '@src/providers/ReadBinaryProvider/IReadBase64Provider'

export class RegisterCNABTransactionsUsecase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private handleBinaryDataProvider: IReadBinaryProvider
  ) {}
  
  async execute(cnabData: string) {
    const data = await this.handleBinaryDataProvider.readBinaryDataToString(cnabData)
    const dataArray = this.handleBinaryDataProvider.parseCNABTransacionData(data)

    const transactions = await this.transactionsRepository.registerTransactions(dataArray)

    return transactions
  }
}
