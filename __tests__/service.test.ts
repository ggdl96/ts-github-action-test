/**
 * Unit tests for src/service.ts
 */
import { processMessageOutput } from '../src/service.js'

describe('service.ts', () => {
  it('returns processed output', async () => {
    const input = 'some data'

    expect(await processMessageOutput(input)).toBeTruthy()
  })
})
