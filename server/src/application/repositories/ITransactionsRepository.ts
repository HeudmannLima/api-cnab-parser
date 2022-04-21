import { TransactionData } from '@src/domain/entities/transactionData'

export interface ITransactionsRepository {
  createTransactionsByCNABData(file: any): Promise <void>
  listAllTransactions(): Promise <TransactionData[]>
}
