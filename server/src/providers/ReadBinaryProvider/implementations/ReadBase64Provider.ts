import{ IReadBynaryProvider } from '@src/providers/ReadBinaryProvider/IReadBase64Provider';
import { CNABdata, TransactionData } from "@src/domain/entities/transactionData"

enum CNABDataPosition {
  TYPE = 1,
  DATE = 9,
  AMOUNT = 19,
  CPF = 30,
  CARD = 42,
  TIME = 48,
  OWNER = 62,
  CLIENT = 81
}

export class ReadBynaryProvider implements IReadBynaryProvider {
  async readBinaryDataToString(fileData: string): Promise<string> {
    const fileBufferData = Buffer.from(fileData, 'base64')
    const content = fileBufferData.toString('utf8')

    return content
  }

  normalizeCNABAmountdata(amount: string): number {
    const amountQty = Number(amount)/100
    return amountQty
  }

  splitDataToArray(data: string): string[] {
    const splittedData = data.split('\n').filter(line => line !== '')
    return splittedData
  }

  parseCNABTransacionData(data: string): TransactionData[] {
    const splittedData = this.splitDataToArray(data)
    const transactionDataArrr: TransactionData[] = []

    for (const line of splittedData) {
      const cnabObj: any = {}
      const enumData = Object.entries(CNABDataPosition)
      const cnabProps = enumData.slice(enumData.length/2)
      let from = 0

      for (const [data, pos] of cnabProps) {
        let value = data.toLowerCase()
        const to = Number(pos.toString())

        cnabObj[value] = line.slice(from, to).trim()

        if (value === 'amount') {
          cnabObj[value] = this.normalizeCNABAmountdata(cnabObj[value])
        }

        from = to
      }

      const transaction = TransactionData.create(cnabObj)
      transactionDataArrr.push(transaction)
    }

    return transactionDataArrr
  }
}
