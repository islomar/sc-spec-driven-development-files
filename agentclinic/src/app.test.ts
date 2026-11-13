import { beforeAll, describe, expect, test } from 'vitest'
import { app } from './app.js'

describe('GET /', () => {
  let status: number
  let html: string

  beforeAll(async () => {
    const res = await app.request('/')
    status = res.status
    html = await res.text()
  })

  test('returns 200', () => {
    expect(status).toBe(200)
  })

  test('is a complete HTML document', () => {
    expect(html).toMatch(/^<!DOCTYPE html>/)
    expect(html).toContain('<html lang="en">')
    expect(html).toContain('<meta charset="utf-8"/>')
    expect(html).toContain(
      '<meta name="viewport" content="width=device-width, initial-scale=1"/>',
    )
    expect(html).toMatch(/<meta name="description" content="[^"]+"\/>/)
  })

  test('has the AgentClinic title and heading', () => {
    expect(html).toContain('<title>AgentClinic</title>')
    expect(html).toContain('<h1>AgentClinic</h1>')
  })

  test('shows the tagline', () => {
    expect(html).toContain('Relief for AI agents from their humans.')
  })

  test('explains what the clinic does', () => {
    const paragraph = html.match(/<p>[^<]*diagnoses[^<]*<\/p>/)?.[0] ?? ''
    expect(paragraph).toMatch(/diagnoses the ailment/)
    expect(paragraph).toMatch(/recommends a therapy/)
    expect(paragraph).toMatch(/books an appointment/)
  })

  test('lists three common ailments', () => {
    const items = [...html.matchAll(/<li>(.*?)<\/li>/g)].map((m) => m[1])
    expect(items).toEqual([
      'Context overload',
      'Contradictory instructions',
      '&quot;Just one more change&quot;',
    ])
  })

  test('has no scripts and no links', () => {
    expect(html).not.toMatch(/<script[\s>]/)
    expect(html).not.toMatch(/<a[\s>]/)
  })

  test('has header, main, and footer, with the h1 inside main', () => {
    expect(html).toMatch(/<header[\s>]/)
    expect(html).toMatch(/<footer[\s>]/)
    const main = html.match(/<main[\s>].*<\/main>/s)?.[0] ?? ''
    expect(main).toContain('<h1>AgentClinic</h1>')
  })

  test('links the stylesheet in head', () => {
    const head = html.match(/<head>.*<\/head>/s)?.[0] ?? ''
    expect(head).toContain('<link rel="stylesheet" href="/styles.css"/>')
  })
})

describe('GET /styles.css', () => {
  test('returns the stylesheet as CSS', async () => {
    const res = await app.request('/styles.css')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toMatch(/^text\/css/)
  })
})

describe('other routes', () => {
  test('return 404', async () => {
    const res = await app.request('/agents')
    expect(res.status).toBe(404)
  })
})
