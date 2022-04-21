import { TransactionData } from "@src/domain/entities/transactionData"

export interface IReadBynaryProvider {
  readBinaryDataToString(fileData: string): Promise<string>
  parseCNABTransacionData(fileData: string): TransactionData[]
}
