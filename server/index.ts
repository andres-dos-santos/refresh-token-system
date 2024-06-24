import Fastify from 'fastify'
import cors from '@fastify/cors'

import { createUser } from './db/users/create-user.js'

const fastify = Fastify()

await fastify.register(cors)

type User = { name: string; email: string; password: string }

fastify.post('/', async (request, reply) => {
  const { name, email, password } = request.body as User

  createUser(name, email, password)

  return reply.send({ ok: true })
})

try {
  await fastify.listen({ port: 3000 }).then(() => console.log('🏃 Running'))
} catch (err) {
  fastify.log.error(err)

  process.exit(1)
}
