import { Layout } from '../components/layout.js'

const ailments = [
  'Context overload',
  'Contradictory instructions',
  '"Just one more change"',
]

export const HomePage = () => (
  <Layout>
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
  </Layout>
)
