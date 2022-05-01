import { CNABdata, TransactionData } from '@src/domain/entities/transactionData'

export interface IReadBinaryProvider {
  readBinaryDataToString(fileData: string): string
  parseCNABTransacionData(fileData: string): TransactionData[]
  calculateCNABTransactions(clientTransactions: CNABdata[]): Number
}
