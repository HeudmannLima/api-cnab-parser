import { CNABdata, TransactionData } from '@src/domain/entities/transactionData'
import { ITransactionsRepository } from '@src/application/repositories/ITransactionsRepository'
import { DbOperations } from '@src/infrastructure/db/dbOperations'

export class TransactionsRepository implements ITransactionsRepository {

  async registerTransactions(cnabArray: TransactionData[]): Promise<CNABdata[]> {
    const db = new DbOperations()
    await db.insertCNABDataArray(cnabArray)
    const emptyCNAB: any = {}
    
    return emptyCNAB
  }

  async listAllTransactionsByClient(client: string): Promise<CNABdata[]> {
    const db = new DbOperations()
    const result = await db.selectCNABsByClient(client)

    return result
  }

  async listAllTransactions(): Promise<CNABdata[]> {
    const db = new DbOperations()
    const result = (await db.selectAllCNABs())
      .sort((a, b) => (a.client).localeCompare(b.client))
    
    return result
  }
}
