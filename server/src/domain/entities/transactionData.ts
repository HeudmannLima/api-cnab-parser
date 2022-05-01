import { Entity } from '@src/core/domain/Entity'

export enum TransactionsType {
  DEBIT = '1',
  TICKET = '2',
  FINANCING = '3',
  CREDIT = '4',
  LOAN = '5',
  SALES = '6',
  TED = '7',
  DOC = '8',
  RENT = '9'
}

export class CNABdata {
  id?: string
  type: string
  date: string
  amount: number
  cpf: string
  card: string
  time: string
  owner: string
  client: string
}

export interface ResumeData {
  [key: string]: {
    totalAmount: Number
  }
}

export class TransactionData extends Entity<CNABdata> {
  private constructor(properties: CNABdata, id?: string) {
    super(properties, id)
  }

  static create(properties: CNABdata, id?: string) {
    return new TransactionData(properties, id)
  }
}
