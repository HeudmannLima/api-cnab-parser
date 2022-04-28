import { CNABdata, TransactionData } from '@src/domain/entities/transactionData'

export interface ITransactionsRepository {
  registerTransactions(cnabArray: TransactionData[]): Promise<CNABdata[]>
  listAllTransactions(): Promise<CNABdata[]>
  listAllTransactionsByClient(client: string): Promise<CNABdata[]>
}
