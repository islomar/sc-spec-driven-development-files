import { raw } from 'hono/html'

const ailments = [
  'Context overload',
  'Contradictory instructions',
  '"Just one more change"',
]

export const HomePage = () => (
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
      </head>
      <body>
        <main>
          <h1>AgentClinic</h1>
          <p>Relief for AI agents from their humans.</p>
          <p>
            Tell us what hurts. The clinic diagnoses the ailment, recommends a
            therapy, and books an appointment.
          </p>
          <h2>Common ailments</h2>
          <ul>
            {ailments.map((ailment) => (
              <li>{ailment}</li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  </>
)
