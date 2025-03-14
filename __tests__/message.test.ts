/**
 * Unit tests for src/message.ts
 */
import { validString } from '../src/message.js'

describe('message.ts', () => {
  it('returns false given an empty input', async () => {
    const input = ''

    expect(validString(input)).toBeFalsy()
  })

  it('returns true given a string', async () => {
    const input = 'some data'

    expect(validString(input)).toBeTruthy()
  })
})
