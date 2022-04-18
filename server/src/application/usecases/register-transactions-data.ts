import { CNABdata } from '../../domain/entities/transactionData'
import { TransactionsRepository } from '../repositories/ITransactionsRepository'

export type RegisterCNABTransactionsRequest = { 
  cnabData: CNABdata
}

export class RegisterCNABTransactions {
  constructor(
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute(cnabs: RegisterCNABTransactionsRequest) {    
    this.transactionsRepository.createTransactionsByCNABData(cnabs.cnabData)
    
    return
  }
}
