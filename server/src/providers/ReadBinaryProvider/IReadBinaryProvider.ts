import { CNABdata, TransactionData } from '@src/domain/entities/transactionData'

export interface IReadBinaryProvider {
  readBinaryDataToString(fileData: string): string
  readBinaryUploadedFileToString(uploadedFilePath: string): Promise<string>
  parseCNABTransacionData(fileData: string): TransactionData[]
  calculateCNABTransactions(clientTransactions: CNABdata[]): Number
}
