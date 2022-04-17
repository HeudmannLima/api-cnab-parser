import { CNABdata } from "../../../domain/entities/transactionData"
import { ImportCNABData } from "../import-cnab-data"

describe('Create data from CNAB imported file', () => {
  const mockedCNABData: CNABdata = {
    type: '4',
    date: '20190601',
    amount: '0000050617',
    cpf: '84515254073',
    cardNumber: '1234****2231',
    time: '100000',
    owner: 'MARCOS PEREIRA',
    client: 'MERCADO DA AVENIDA'
  }

  it('should be able to create a new CNAB transaction data', async () => {
    const transaction = new ImportCNABData()

    const response = await transaction.execute({ cnabData: mockedCNABData })
    console.log(response)
    expect(response).toBeTruthy()
  })
})