import { ITransactionsRepository } from '../repositories/ITransactionsRepository'
import { IReadBynaryProvider } from '@src/providers/ReadBinaryProvider/IReadBase64Provider'

export class RegisterCNABTransactionsUsecase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private handleBinaryDataProvider: IReadBynaryProvider
  ) {}
  
  async execute(cnabData: string) {
    const data = await this.handleBinaryDataProvider.readBinaryDataToString(cnabData)
    const dataArray = this.handleBinaryDataProvider.parseCNABTransacionData(data)

    await this.transactionsRepository.registerTransactions(dataArray)

    return
  }
}
