import { v4 } from 'uuid'

export abstract class Entity<T> {
  readonly id: string
  public properties: T

  constructor(properties: T, id?: string) {
    this.properties = properties
    this.id = id ?? v4()
  }
}
