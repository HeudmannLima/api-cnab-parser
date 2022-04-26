import { LoadPostgresDriver } from "./drivers/postgresDriver";

export default async function loadDatabase() {
  LoadPostgresDriver.initialize()

  const client = await LoadPostgresDriver.connectToDB()

  const sql = `CREATE TABLE IF NOT EXISTS transactions (
    id UUID NOT NULL,
    type VARCHAR(1) NOT NULL,
    date VARCHAR(8) NOT NULL,
    amount FLOAT(10) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    card VARCHAR(12) NOT NULL,
    time VARCHAR(6) NOT NULL,
    owner VARCHAR(14) NOT NULL,
    client VARCHAR(19) NOT NULL
  );`

  return await client.query(sql)
}
