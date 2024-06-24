import { sqlite } from '../db'

import type { IUser } from '../../@types/user'

const db = new sqlite.Database(
  '/Users/zaaltecnologia/dev/refresh-token-with-node-and-react/server/db/users/users.db',
)

export async function findUserByEmail(email: string): Promise<IUser | null> {
  const callback = new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE email = ?`

    db.all(sql, [email], (err, rows) => {
      if (err) {
        reject(err)
        return
      }

      resolve(rows)
    })
  })

  const data = (await callback) as IUser[]

  const raw = data ? data[0] : null

  db.close((err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Closed the database connection.')
  })

  return raw

  // db.serialize(() => {
  //   db.all(``, [email], (err, rows) => {
  //     if (err) {
  //       console.error(err.message)
  //     } else {
  //       rows.forEach((row) => {
  //         data = [...data, row]
  //       })
  //     }

  //

  //     return data
  //   })
  // })
}
