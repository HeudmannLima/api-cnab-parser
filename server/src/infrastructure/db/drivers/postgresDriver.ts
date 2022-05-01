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

  static async connectToDB(): Promise<PoolClient | undefined> {
    try {
      return await this.POOL.connect()
    } catch (err) {
      console.warn(err)
    }
  }
}
