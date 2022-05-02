import { ReadBinaryProvider } from '@src/providers/ReadBinaryProvider/implementations/ReadBinaryProvider'
import { InMemoryTransactionsRepository } from '@src/tests/repositories/in-memory-transactions-repository'
import { ListCNABTransactionsByClientUsecase } from '@src/application/usecases/list-transactions-by-client'
import { RegisterCNABTransactionsUsecase } from '@src/application/usecases/register-transactions'

let registerUsecase: RegisterCNABTransactionsUsecase
let listByClientUsecase: ListCNABTransactionsByClientUsecase
let readBinaryProvider: ReadBinaryProvider
let inMemoryTransactionsRepository: InMemoryTransactionsRepository

describe('List transactions by client', () => {
  beforeEach(() => {
    readBinaryProvider = new ReadBinaryProvider()
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()
    
    listByClientUsecase = new ListCNABTransactionsByClientUsecase(inMemoryTransactionsRepository)

    registerUsecase = new RegisterCNABTransactionsUsecase(
      inMemoryTransactionsRepository, 
      readBinaryProvider
    )
  })

  it('should be able to show specific client transactions by client name', async () => {

    const mockedCNABData = 
      '1201903010000020000556418150631234****3324090002MARIA JOSEFINALOJA DO Ó - MATRIZ\n'+
      '2201903220000080200845152540734567****1234144567MARCOS PEREIRAMERCADO DA AVENIDA\n'+
      '5201903010000080200845152540733123****7687145607MARCOS PEREIRAMERCADO DA AVENIDA\n'+
      '2201903010000010200232702980568473****1231231233JOSÉ COSTA    MERCEARIA 3 IRMÃOS'

    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(() => mockedCNABData)

    const createdCNABDataList = await registerUsecase.execute(mockedCNABData)
    const transactionsListByClient = await listByClientUsecase.execute('MERCADO DA AVENIDA')

    expect(createdCNABDataList).toEqual(expect.arrayContaining(transactionsListByClient))
  })
})
