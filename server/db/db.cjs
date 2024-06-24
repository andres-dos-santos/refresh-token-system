/* eslint-disable @typescript-eslint/no-var-requires */
const sqlite3 = require('sqlite3')
const path = require('path')

const sqlite = sqlite3.verbose()

const db = new sqlite.Database(path.resolve(__dirname, './users/users.db'))

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`)
})

db.close()
