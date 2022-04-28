import { ITransactionsRepository } from '@src/application/repositories/ITransactionsRepository'

export class ListCNABTransactionsUsecase {
  constructor(
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute() {    
    const result = this.transactionsRepository.listAllTransactions()

    return result
  }
}
