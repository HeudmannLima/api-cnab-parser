import { CNABdata } from '@src/domain/entities/transactionData'
import { ITransactionsRepository } from '../repositories/ITransactionsRepository'

export class ListResumeCNABTransactionsUsecase {
  constructor(
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(allTransactions: CNABdata[]) {
    const allClients = Array.from(new Set(allTransactions.map(data => data.client)))
    const clientData = {
      totalAmount: Number
    }

    for (const client of allClients) {
      const clientTransactions = allTransactions.filter(data => data.client === client)
      const totalAmount = this.transactionsRepository.calculateCNABTransactions(clientTransactions)

      clientData[client] = { totalAmount }
    }

    return clientData
  }
}
