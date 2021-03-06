import { ReadBinaryProvider } from '@src/providers/ReadBinaryProvider/implementations/ReadBinaryProvider'
import { InMemoryTransactionsRepository } from '@src/tests/repositories/in-memory-transactions-repository'
import { ListResumeCNABTransactionsByClientUsecase } from '@src/application/usecases/list-resume-by-client'
import { ListCNABTransactionsByClientUsecase } from '@src/application/usecases/list-transactions-by-client'
import { RegisterCNABTransactionsUsecase } from '@src/application/usecases/register-transactions'

let registerUsecase: RegisterCNABTransactionsUsecase
let listByClientUsecase: ListCNABTransactionsByClientUsecase
let readBinaryProvider: ReadBinaryProvider
let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let listResumeByClientUsecase: ListResumeCNABTransactionsByClientUsecase

describe('List resume transactions by client', () => {
  beforeEach(() => {
    readBinaryProvider = new ReadBinaryProvider()
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    listByClientUsecase = new ListCNABTransactionsByClientUsecase(inMemoryTransactionsRepository)
    listResumeByClientUsecase = new ListResumeCNABTransactionsByClientUsecase(readBinaryProvider)

    registerUsecase = new RegisterCNABTransactionsUsecase(
      inMemoryTransactionsRepository, 
      readBinaryProvider
    )
  })

  const mockedCNABData = 
    '1201903010000010000556418150631234****3324090002MARIA JOSEFINALOJA DO Ó - MATRIZ\n'+
    '2201903010000005000556418150631234****3324090002MARIA JOSEFINALOJA DO Ó - MATRIZ\n'+
    '4201903220000020000845152540734567****1234144567MARCOS PEREIRAMERCADO DA AVENIDA\n'+
    '9201903010000010000845152540733123****7687145607MARCOS PEREIRAMERCADO DA AVENIDA\n'+
    '7201903010000025000232702980568473****1231231233JOSÉ COSTA    MERCEARIA 3 IRMÃOS\n'+
    '3201903010000050000232702980568473****1231231233JOSÉ COSTA    MERCEARIA 3 IRMÃOS'

  it('should be able to show specific client resume transactions by client name', async () => {

    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(() => mockedCNABData)
    await registerUsecase.execute(mockedCNABData)

    const allClientTransactions = await listByClientUsecase.execute('MERCEARIA 3 IRMÃOS')
    const clientResume = await listResumeByClientUsecase.execute(allClientTransactions)

    expect(clientResume['MERCEARIA 3 IRMÃOS'].totalAmount).toBe(-250)
  })
})
