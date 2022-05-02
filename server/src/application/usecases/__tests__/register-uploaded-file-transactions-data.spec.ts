import { ReadBinaryProvider } from '@src/providers/ReadBinaryProvider/implementations/ReadBinaryProvider'
import { InMemoryTransactionsRepository } from '@src/tests/repositories/in-memory-transactions-repository'
import { RegisterCNABTransactionsByUploadUsecase } from '../register-uploaded-file-transactions'
import fs from 'fs'

let registerUploadUsecase: RegisterCNABTransactionsByUploadUsecase
let readBinaryProvider: ReadBinaryProvider
let inMemoryTransactionsRepository: InMemoryTransactionsRepository

describe('Register uploaded file transactions', () => {
  beforeEach(() => {
    readBinaryProvider = new ReadBinaryProvider()
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()

    registerUploadUsecase = new RegisterCNABTransactionsByUploadUsecase(
      inMemoryTransactionsRepository, 
      readBinaryProvider
    )
  })

  it('should not be able to create a CNAB with an invalid file data', async () => {
    const invalidCNABFilePath = './src/tests/mocks/invalidData'

    try {
      await registerUploadUsecase.execute(invalidCNABFilePath)

    } catch (error) {      
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', expect.stringContaining('Error on process CNAB file'))
    }
  })

  it('should be able to register transactions from an uploaded CNAB text file', async () => {
    const cnabTestFilePath = './src/tests/mocks/testFileCNAB.txt'

    jest.spyOn(fs, 'unlinkSync').mockImplementationOnce(() => null)
    const transactionArray = await registerUploadUsecase.execute(cnabTestFilePath)

    expect(transactionArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: '1', cpf: '55641815063', owner: 'MARIA JOSEFINA', client: 'LOJA DO Ó - MATRIZ' }),
        expect.objectContaining({ type: '5', cpf: '84515254073', owner: 'MARCOS PEREIRA', client: 'MERCADO DA AVENIDA' }),
        expect.objectContaining({ type: '2', cpf: '23270298056', owner: 'JOSÉ COSTA', client: 'MERCEARIA 3 IRMÃOS' })
      ])
    )
  })
})
