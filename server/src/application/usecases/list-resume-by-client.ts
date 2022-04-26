import { CNABdata } from '@src/domain/entities/transactionData'
import { ITransactionsRepository } from '../repositories/ITransactionsRepository'

export class ListResumeCNABTransactionsByClientUsecase {
  constructor(
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(clientTransactionsData: CNABdata[]) {
    const clientData = {
      totalAmount: Number
    }

    const totalAmount = this.transactionsRepository.calculateCNABTransactions(clientTransactionsData)
    clientData[clientTransactionsData[0].client] = { totalAmount }

    return clientData
  }
}
