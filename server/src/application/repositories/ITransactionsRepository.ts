import { TransactionData } from '../../domain/entities/transactionData'

export interface TransactionsRepository {
  createTransactionsByCNABData(file: any): Promise <void>
  listAllTransactions(): Promise <TransactionData[]>
}
