import { Pool, PoolClient, QueryResult } from 'pg'

export class LoadPostgresDriver {
  private static POOL: Pool
  
  constructor() {
    LoadPostgresDriver.POOL = new Pool({
      max: 1,
      idleTimeoutMillis: 30000,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432')
    })
  }

  static initialize(): void {
    new LoadPostgresDriver()
  }

  static connectToDB = async (): Promise<PoolClient> => {
    try {
      return await this.POOL.connect()
    } catch (err) {
      console.log(err)
    }
  }

  async query<T>(sql: string, values?: unknown[]): Promise<QueryResult<T>> {
    let client: PoolClient
    try {
      client = await LoadPostgresDriver.POOL.connect()
      return await client.query<T>(sql, values)
    } catch (error) {
      console.error(`Error: ${error}`)
    } finally {
      client.release(true)
    }
  }
}
