import { ITransactionsRepository } from '../repositories/ITransactionsRepository'
import { ReadBynaryProvider } from '@src/providers/ReadBinaryProvider/implementations/ReadBase64Provider'

export class RegisterCNABTransactionsUsecase {
  constructor(
    private transactionsRepository: ITransactionsRepository
  ) {}
  
  async execute(cnabData: string) {    
    // this.transactionsRepository.createTransactionsByCNABData(cnabData) ///
  
    const handleBinaryData = new ReadBynaryProvider()
    const data = await handleBinaryData.readBinaryDataToString(cnabData)

    const dataArray = handleBinaryData.parseCNABTransacionData(data)

    return dataArray
  }
}
