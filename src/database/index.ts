import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'challange07_fin_api'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host
    })
  )
}
