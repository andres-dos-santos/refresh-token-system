import { sqlite } from '../db'

const db = new sqlite.Database(
  '/Users/zaaltecnologia/dev/refresh-token-with-node-and-react/server/db/users/users.db',
)

export function createUser(name: string, email: string, password: string) {
  db.serialize(() => {
    const stmt = db.prepare(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stmt.run(name, email, password, (err: any) => {
      if (err) {
        return console.error(err.message)
      }
    })

    stmt.finalize()
  })

  db.close()
}
