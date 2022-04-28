import { CNABdata, TransactionData } from '@src/domain/entities/transactionData'
import { ITransactionsRepository } from '@src/application/repositories/ITransactionsRepository'
import { randomUUID } from 'crypto'

export class InMemoryTransactionsRepository implements ITransactionsRepository {
  private transactions: CNABdata[] = []

  async registerTransactions(cnabArray: TransactionData[]): Promise<CNABdata[]> {
    const createdResponse: CNABdata[] = []

    for (const data of cnabArray) {
      const cnab: CNABdata = { id: randomUUID(), ...data.properties }
      this.transactions.push(cnab)
      createdResponse.push(cnab)
    }

    return createdResponse
  }

  async listAllTransactions(): Promise<CNABdata[]> {
    return this.transactions
  }

  async listAllTransactionsByClient(client: string): Promise<CNABdata[]> {
    const transactions = this.transactions.filter(data => data.client === client)

    return transactions
  }
}