import { CNABdata, TransactionData } from '@src/domain/entities/transactionData'
import { LoadPostgresDriver } from '@src/infrastructure/db/drivers/postgresDriver'
import { PoolClient, QueryResult } from 'pg'

export class DbOperations {

  constructor () {
    LoadPostgresDriver.initialize()
  }

  async selectAllCNABs(): Promise<CNABdata[]> {
    let result: QueryResult<CNABdata> = {} as any
    const client: PoolClient | undefined = await LoadPostgresDriver.connectToDB()

    try {
      const sql = `SELECT * FROM transactions`
      result = await client!.query(sql)

    } catch (err) {
      console.warn(`Transaction error: `, err)

    } finally {
      client!.release()
    }

    return result.rows
  }

  async selectCNABsByClient(clientName: string): Promise<CNABdata[]> {
    let result: QueryResult<CNABdata> = {} as any
    const client: PoolClient | undefined = await LoadPostgresDriver.connectToDB()

    try {
      const sql = `SELECT * FROM transactions WHERE client = $1;`
      result = await client!.query(sql, [clientName])

    } catch (err) {
      console.warn(`Transaction error: `, err)

    } finally {
      client!.release()
    }

    return result.rows
  }

  async insertCNABDataArray(cnabArray: TransactionData[]) {    
    const client: PoolClient | undefined = await LoadPostgresDriver.connectToDB()
  
    try {
      await client!.query(`BEGIN`)
  
      try {
        const sql= `INSERT INTO transactions (
          id, type, date, amount, cpf, card, time, owner, client
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        );`
  
        for (const data of cnabArray) {
          const props = { ...data.properties }
          const values = [ 
            data.id, 
            props.type, 
            props.date,
            props.amount,
            props.cpf,
            props.card,
            props.time,
            props.owner,
            props.client
          ]

          client!.query(sql, values, (err, _result) => {
            if (err) {              
              client!.query(`ROLLBACK`)
              console.warn(`Transaction ROLLBACK called - Error: `, err)
            } else {
              client!.query(`COMMIT`)
            }
          })
        }

      } catch (err) {
        client!.query(`ROLLBACK`)
        console.warn(`Transaction ROLLBACK called - Error: `, err)
      }
  
    } finally {
      client!.release()
    }
  }
}
