import { CNABdata, TransactionData } from '../../domain/entities/transactionData'

export type ImportCNABDataRequest = { 
  cnabData: CNABdata
}

export class ImportCNABData {
  async execute(data: ImportCNABDataRequest) {
    const transaction = TransactionData.create(data.cnabData)

    return transaction
  }
}
