import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { HomePage } from './pages/home.js'

const app = new Hono()

app.use('/styles.css', serveStatic({ root: './public' }))

app.get('/', (c) => c.html(<HomePage />))

const port = Number(process.env.PORT ?? 3000)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AgentClinic listening on http://localhost:${info.port}`)
})
