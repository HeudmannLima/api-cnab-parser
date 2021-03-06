import { ITransactionsRepository } from '@src/application/repositories/ITransactionsRepository'
import { IReadBinaryProvider } from '@src/providers/ReadBinaryProvider/IReadBinaryProvider'

export class RegisterCNABTransactionsUsecase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private handleBinaryDataProvider: IReadBinaryProvider
  ) {}
  
  async execute(cnabData: string) {
    const data = this.handleBinaryDataProvider.readBinaryDataToString(cnabData)
    const dataArray = this.handleBinaryDataProvider.parseCNABTransacionData(data)

    const transactions = await this.transactionsRepository.registerTransactions(dataArray)

    return transactions
  }
}
