import { CNABdata } from '../../domain/entities/transactionData'
// import { TransactionsRepository } from '../repositories/ITransactionsRepository'

export type RegisterCNABTransactionsRequest = { 
  cnabData: CNABdata
}

export class ListCNABTransactions {
  constructor(
    // private transactionsRepository: TransactionsRepository
  ) {}

  async execute() {    
    // const transactions = this.transactionsRepository.listAllTransactions()

    // return transactions
  }
}
