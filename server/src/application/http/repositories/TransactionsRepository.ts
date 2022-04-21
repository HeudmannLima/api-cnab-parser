import { TransactionData } from '@src/domain/entities/transactionData'
import { ITransactionsRepository } from '@src/application/repositories/ITransactionsRepository'

export class TransactionsRepository implements ITransactionsRepository {
  async createTransactionsByCNABData(file: any): Promise<void> {
    return file
  }

  async listAllTransactions(): Promise<TransactionData[]> {
    return []
  }
}
