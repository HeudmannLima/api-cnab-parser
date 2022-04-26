import { ITransactionsRepository } from '../repositories/ITransactionsRepository'

export class ListCNABTransactionsByClientUsecase {
  constructor(
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(client: string) {    
    const result = this.transactionsRepository.listAllTransactionsByClient(client)

    return result
  }
}
