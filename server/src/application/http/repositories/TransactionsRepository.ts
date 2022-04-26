import { CNABdata, TransactionData, TransactionsType as Type } from '@src/domain/entities/transactionData'
import { ITransactionsRepository } from '@src/application/repositories/ITransactionsRepository'
import { DbOperations } from '@src/infrastructure/db/dbOperations'

export class TransactionsRepository implements ITransactionsRepository {
  async listAllTransactionsByClient(client: string): Promise<CNABdata[]> {
    const db = new DbOperations()
    const result = await db.selectCNABsByClient(client)
    
    return result
  }

  async registerTransactions(cnabArray: TransactionData[]): Promise<void> {
    const db = new DbOperations()
    await db.insertCNABDataArray(cnabArray)

    return
  }

  async listAllTransactions(): Promise<CNABdata[]> {
    const db = new DbOperations()
    const result = (await db.selectAllCNABs())
      .sort((a, b) => (a.client).localeCompare(b.client))
    
    return result
  }

  public calculateCNABTransactions(clientTransactions: CNABdata[]): Number {
    let amount = 0

    for (const transaction of clientTransactions) {
      if (String([Type.DEBIT, Type.CREDIT, Type.LOAN, Type.SALES, Type.TED, Type.DOC]).includes(transaction.type)) {
        amount += transaction.amount

      } else if (String([Type.TICKET, Type.FINANCING, Type.RENT]).includes(transaction.type)) {
        amount -= transaction.amount
      }
    }

    return  amount
  }
}
