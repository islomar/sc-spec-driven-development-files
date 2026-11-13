import { raw } from 'hono/html'
import type { Child } from 'hono/jsx'
import { Footer } from './footer.js'
import { Header } from './header.js'
import { Main } from './main.js'

export const Layout = ({ children }: { children: Child }) => (
  <>
    {raw('<!DOCTYPE html>')}
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="AgentClinic: relief for AI agents from their humans."
        />
        <title>AgentClinic</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  </>
)
