import { ReadBinaryProvider } from '@src/providers/ReadBinaryProvider/implementations/ReadBinaryProvider'
import { InMemoryTransactionsRepository } from '@src/tests/repositories/in-memory-transactions-repository'
import { RegisterCNABTransactionsUsecase } from '@src/application/usecases/register-transactions'

let registerUsecase: RegisterCNABTransactionsUsecase
let readBinaryProvider: ReadBinaryProvider
let inMemoryTransactionsRepository: InMemoryTransactionsRepository

describe('Register transactions', () => {
  beforeEach(() => {
    readBinaryProvider = new ReadBinaryProvider()
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    registerUsecase = new RegisterCNABTransactionsUsecase(
      inMemoryTransactionsRepository, 
      readBinaryProvider
    )
  })

  it('should not be able to create a CNAB with an invalid base64 string data', async () => {
    const mockedBase64data = 'Co\qKioMjM\0MjM0Sk/.Dg08gTUFDRURPICPIEpPw4NPICAgICAgIAoxMjA\dCoqKiowMDk5CAgQ.kFSI'

    try {
      await registerUsecase.execute(mockedBase64data)

    } catch (error) {      
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'Base64 string is not valid.');
    }
  })

  it('should be able to create a single CNAB transaction', async () => {
    const mockedCNABData = '2201903010000010200232702980568473****1231231233JOSÉ COSTA    MERCEARIA 3 IRMÃOS'

    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(() => mockedCNABData)
    const transactionArray = await registerUsecase.execute(mockedCNABData)
    const [singleTransactionObj] = transactionArray

    expect(singleTransactionObj).toHaveProperty('id')
    expect(singleTransactionObj).not.toHaveProperty('properties')
    expect(transactionArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: '2', cpf: '23270298056', owner: 'JOSÉ COSTA', client: 'MERCEARIA 3 IRMÃOS' })
      ])
    )
  })

  it('should be able to create multiple CNAB transactions successfully', async () => {
    const mockedCNABData = 
      '1201903010000020000556418150631234****3324090002MARIA JOSEFINALOJA DO Ó - MATRIZ\n'+
      '5201903010000080200845152540733123****7687145607MARCOS PEREIRAMERCADO DA AVENIDA\n'+
      '2201903010000010200232702980568473****1231231233JOSÉ COSTA    MERCEARIA 3 IRMÃOS'

    jest.spyOn(readBinaryProvider, 'readBinaryDataToString').mockImplementationOnce(() => mockedCNABData)
    const transactionArray = await registerUsecase.execute(mockedCNABData)

    expect(transactionArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: '1', cpf: '55641815063', owner: 'MARIA JOSEFINA', client: 'LOJA DO Ó - MATRIZ' }),
        expect.objectContaining({ type: '5', cpf: '84515254073', owner: 'MARCOS PEREIRA', client: 'MERCADO DA AVENIDA' }),
        expect.objectContaining({ type: '2', cpf: '23270298056', owner: 'JOSÉ COSTA', client: 'MERCEARIA 3 IRMÃOS' })
      ])
    )
  })
})
