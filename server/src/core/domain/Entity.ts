import crypto from 'crypto'

export abstract class Entity<T> {
  readonly id: string
  public properties: T

  constructor(properties: T, id?: string) {
    this.properties = properties
    this.id = id ?? crypto.randomUUID()
  }
}
