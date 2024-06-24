import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from 'jsonwebtoken'
import cookie, { type FastifyCookieOptions } from '@fastify/cookie'

import { createUser } from './db/users/create-user.js'
import { findUserByEmail } from './db/users/find-user.js'

import type { IUser } from './@types/user.js'

const fastify = Fastify()

await fastify.register(cookie, {} as FastifyCookieOptions)

await fastify.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type'],
})

fastify.post<{ Body: IUser }>('/register', async (request, reply) => {
  const { name, email, password } = request.body

  createUser(name, email, password)

  return reply.send({ ok: true })
})

fastify.post<{ Body: IUser }>('/login', async (request, reply) => {
  const { email, password } = request.body

  const user = await findUserByEmail(email)

  if (user) {
    if (user.password === password) {
      const access = jwt.sign({ email }, 'jwt-access-token-secret-key', {
        expiresIn: 60,
      })

      const refresh = jwt.sign({ email }, 'jwt-refresh-token-secret-key', {
        expiresIn: '5m',
      })

      const accessCookie = cookie.serialize('access-token', access, {
        maxAge: 60,
      })

      const refreshCookie = cookie.serialize('refresh-token', refresh, {
        maxAge: 300000,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })

      reply.header('Set-Cookie', accessCookie)

      reply.header('Set-Cookie', refreshCookie)

      return reply.send({ message: 'Cookie is set', access, refresh })
    }
  } else {
    return reply.status(400).send({ message: 'No user found!' })
  }
})

try {
  await fastify.listen({ port: 3000 }).then(() => console.log('🏃 Running'))
} catch (err) {
  fastify.log.error(err)

  process.exit(1)
}
