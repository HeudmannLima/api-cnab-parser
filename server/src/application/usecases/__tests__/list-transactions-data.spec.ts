import { ReadBinaryProvider } from '@src/providers/ReadBinaryProvider/implementations/ReadBase64Provider'
import { InMemoryTransactionsRepository } from '@src/tests/repositories/in-memory-transactions-repository'
import { ListCNABTransactionsUsecase } from '@src/application/usecases/list-all-transactions'
import { ListCNABTransactionsByClientUsecase } from '@src/application/usecases/list-transactions-by-client'
import { RegisterCNABTransactionsUsecase } from '@src/application/usecases/register-transactions'

let registerUsecase: RegisterCNABTransactionsUsecase
let listUsecase: ListCNABTransactionsUsecase
let listByClientUsecase: ListCNABTransactionsByClientUsecase
let readBinaryProvider: ReadBinaryProvider
let inMemoryTransactionsRepository: InMemoryTransactionsRepository

describe('List transactions', () => {
  beforeEach(() => {
    readBinaryProvider = new ReadBinaryProvider()
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    listUsecase = new ListCNABTransactionsUsecase(inMemoryTransactionsRepository)
    listByClientUsecase = new ListCNABTransactionsByClientUsecase(inMemoryTransactionsRepository)

    registerUsecase = new RegisterCNABTransactionsUsecase(
      inMemoryTransactionsRepository, 
      readBinaryProvider
    )
  })

  it('should be able to list all client transactions', async () => {

    const mockedCNAB1 = '1201903010000020000556418150631234****3324090002MARIA JOSEFINALOJA DO Ó - MATRIZ'    
    const mockedCNAB2 = '5201903010000080200845152540733123****7687145607MARCOS PEREIRAMERCADO DA AVENIDA'
    const mockedCNAB3 = '2201903010000010200232702980568473****1231231233JOSÉ COSTA    MERCEARIA 3 IRMÃOS'
    
    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(async () => mockedCNAB1)
    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(async () => mockedCNAB2)
    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(async () => mockedCNAB3)

    const [createdCNABData1] = await registerUsecase.execute(mockedCNAB1)
    const [createdCNABData2] = await registerUsecase.execute(mockedCNAB1)
    const [createdCNABData3] = await registerUsecase.execute(mockedCNAB3)

    const transactionsList = await listUsecase.execute()

    expect(transactionsList).toEqual([createdCNABData1, createdCNABData2, createdCNABData3])
  })

  it('should be able to show specific client transactions by client name', async () => {

    const mockedCNABData = 
      '1201903010000020000556418150631234****3324090002MARIA JOSEFINALOJA DO Ó - MATRIZ\n'+
      '2201903220000080200845152540734567****1234144567MARCOS PEREIRAMERCADO DA AVENIDA\n'+
      '5201903010000080200845152540733123****7687145607MARCOS PEREIRAMERCADO DA AVENIDA\n'+
      '2201903010000010200232702980568473****1231231233JOSÉ COSTA    MERCEARIA 3 IRMÃOS'

    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(async () => mockedCNABData)

    const createdCNABDataList = await registerUsecase.execute(mockedCNABData)
    const transactionsListByClient = await listByClientUsecase.execute('MERCADO DA AVENIDA')

    expect(createdCNABDataList).toEqual(expect.arrayContaining(transactionsListByClient))
  })
})
