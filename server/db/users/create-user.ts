/* eslint-disable @typescript-eslint/no-explicit-any */
import sqlite3 from 'sqlite3'
import path from 'node:path'

const sqlite = sqlite3.verbose()

const __dirname = path.resolve()

const directory = path.join(__dirname, '../users')

const dbPath = path.join(directory, 'users.db')

export function createUser(name: string, email: string, password: string) {
  const db = new sqlite.Database(dbPath)

  db.serialize(() => {
    const stmt = db.prepare(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    )

    stmt.run(name, email, password, (err: any) => {
      if (err) {
        return console.error(err.message)
      }
    })

    stmt.finalize()
  })

  db.close()
}
