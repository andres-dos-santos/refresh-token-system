/* eslint-disable @typescript-eslint/no-explicit-any */
import sqlite3 from 'sqlite3'
// import path from 'node:path'

const sqlite = sqlite3.verbose()

// const __dirname = path.resolve()

export function createUser(name, email, password) {
  const db = new sqlite.Database(
    '/Users/zaaltecnologia/dev/refresh-token-with-node-and-react/server/db/users/users.db',
  )
  // console.log(path.resolve(__dirname, './db/users/users.db'))

  db.serialize(() => {
    const stmt = db.prepare(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    )

    stmt.run(name, email, password, (err) => {
      if (err) {
        return console.error(err.message)
      }
    })

    stmt.finalize()
  })

  db.close()
}
