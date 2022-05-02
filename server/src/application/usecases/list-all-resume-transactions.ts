import { CNABdata, ResumeData } from '@src/domain/entities/transactionData'
import { IReadBinaryProvider } from '@src/providers/ReadBinaryProvider/IReadBinaryProvider'

export class ListResumeCNABTransactionsUsecase {
  constructor(
    private readBinaryProvider: IReadBinaryProvider
  ) {}

  async execute(allTransactions: CNABdata[]) {
    const allClients = Array.from(new Set(allTransactions.map(data => data.client)))
    const clientData: ResumeData = {}

    for (const client of allClients) {
      const clientTransactions = allTransactions.filter(data => data.client === client)
      const totalAmount = this.readBinaryProvider.calculateCNABTransactions(clientTransactions)

      clientData[client] = { totalAmount }
    }

    return clientData
  }
}
