import { InMemoryTransactionsRepository } from "../../../../tests/repositories/in-transactions-repository"
// import { CNABdata } from "../../../domain/entities/transactionData"
import { ListCNABTransactions } from "../list-transactions-data"

describe('List transactions data from database', () => {
  // const mockedCNABList: CNABdata[] = [
  //   {
  //     type: '4',
  //     date: '20190601',
  //     amount: '0000050617',
  //     cpf: '84515254073',
  //     cardNumber: '1234****2231',
  //     time: '100000',
  //     owner: 'MARCOS PEREIRA',
  //     client: 'MERCADO DA AVENIDA'
  //   },
  //   {
  //     type: '4',
  //     date: '20190601',
  //     amount: '0000050617',
  //     cpf: '84515254073',
  //     cardNumber: '1234****2231',
  //     time: '100000',
  //     owner: 'MARCOS PEREIRA',
  //     client: 'MERCADO DA AVENIDA'
  //   },
  //   {
  //     type: '4',
  //     date: '20190601',
  //     amount: '0000050617',
  //     cpf: '84515254073',
  //     cardNumber: '1234****2231',
  //     time: '100000',
  //     owner: 'MARCOS PEREIRA',
  //     client: 'MERCADO DA AVENIDA'
  //   }
  // ]

  it('should be able to list all CNAB transactions', async () => {
    const transactionsRepository = new InMemoryTransactionsRepository
    const transaction = new ListCNABTransactions(transactionsRepository)

    const response = await transaction.execute()

    expect(response).toBeTruthy()
  })
})