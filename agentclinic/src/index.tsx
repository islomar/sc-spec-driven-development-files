import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HomePage } from './pages/home.js'

const app = new Hono()

app.get('/', (c) => c.html(<HomePage />))

const port = Number(process.env.PORT ?? 3000)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AgentClinic listening on http://localhost:${info.port}`)
})
