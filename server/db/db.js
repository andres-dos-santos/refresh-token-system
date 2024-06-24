/* eslint-disable @typescript-eslint/no-var-requires */
import sqlite3 from 'sqlite3'
// const path = require('path')

export const sqlite = sqlite3.verbose()

const db = new sqlite.Database(
  '/Users/zaaltecnologia/dev/refresh-token-with-node-and-react/server/db/users/users.db',
)

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`)
})

db.close()
