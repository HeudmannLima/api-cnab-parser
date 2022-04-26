import { CNABdata, TransactionData } from '@src/domain/entities/transactionData'

export interface ITransactionsRepository {
  registerTransactions(cnabArray: TransactionData[]): Promise<void>
  listAllTransactions(): Promise<CNABdata[]>
  listAllTransactionsByClient(client: string): Promise<CNABdata[]>
  calculateCNABTransactions(clientTransactions: CNABdata[]): Number
}
