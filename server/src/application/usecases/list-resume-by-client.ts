import { CNABdata, ResumeData } from '@src/domain/entities/transactionData'
import { ReadBinaryProvider } from '@src/providers/ReadBinaryProvider/implementations/ReadBinaryProvider'

export class ListResumeCNABTransactionsByClientUsecase {
  constructor(
    private readBinaryProvider: ReadBinaryProvider
  ) {}

  async execute(clientTransactionsData: CNABdata[]) {
    const { client } = clientTransactionsData[0]
    const clientData: ResumeData = {}
    
    const totalAmount = this.readBinaryProvider.calculateCNABTransactions(clientTransactionsData)
    clientData[client] = { totalAmount }

    return clientData
  }
}
