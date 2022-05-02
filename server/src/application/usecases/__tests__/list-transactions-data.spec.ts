import { ReadBinaryProvider } from '@src/providers/ReadBinaryProvider/implementations/ReadBinaryProvider'
import { InMemoryTransactionsRepository } from '@src/tests/repositories/in-memory-transactions-repository'
import { ListCNABTransactionsUsecase } from '@src/application/usecases/list-all-transactions'
import { RegisterCNABTransactionsUsecase } from '@src/application/usecases/register-transactions'

let registerUsecase: RegisterCNABTransactionsUsecase
let listUsecase: ListCNABTransactionsUsecase
let readBinaryProvider: ReadBinaryProvider
let inMemoryTransactionsRepository: InMemoryTransactionsRepository

describe('List transactions', () => {
  beforeEach(() => {
    readBinaryProvider = new ReadBinaryProvider()
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    listUsecase = new ListCNABTransactionsUsecase(inMemoryTransactionsRepository)

    registerUsecase = new RegisterCNABTransactionsUsecase(
      inMemoryTransactionsRepository, 
      readBinaryProvider
    )
  })

  it('should be able to list all client transactions', async () => {

    const mockedCNAB1 = '1201903010000020000556418150631234****3324090002MARIA JOSEFINALOJA DO Ó - MATRIZ'    
    const mockedCNAB2 = '5201903010000080200845152540733123****7687145607MARCOS PEREIRAMERCADO DA AVENIDA'
    const mockedCNAB3 = '2201903010000010200232702980568473****1231231233JOSÉ COSTA    MERCEARIA 3 IRMÃOS'
    
    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(() => mockedCNAB1)
    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(() => mockedCNAB2)
    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(() => mockedCNAB3)

    const [createdCNABData1] = await registerUsecase.execute(mockedCNAB1)
    const [createdCNABData2] = await registerUsecase.execute(mockedCNAB1)
    const [createdCNABData3] = await registerUsecase.execute(mockedCNAB3)

    const transactionsList = await listUsecase.execute()

    expect(transactionsList).toEqual([createdCNABData1, createdCNABData2, createdCNABData3])
  })
})
