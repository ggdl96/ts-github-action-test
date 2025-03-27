/**
 * Unit tests for src/service.ts
 */
import { processMessageOutput } from '../__fixtures__/service'
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'

jest.unstable_mockModule('../src/service.js', () => ({ processMessageOutput }))

describe('service.ts', () => {
  beforeEach(() => {
    // Set the action's inputs as return values from core.getInput().
    core.getInput.mockImplementation(() => 'https://some-url')
    core.getIDToken.mockImplementation(() => Promise.resolve('sos32af47'))

    processMessageOutput.mockImplementation(() => Promise.resolve('true'))
    processMessageOutput.mockImplementation(() =>
      Promise.resolve('This was the received message: hello!')
    )
  })

  it('returns processed output', async () => {
    const input = 'some data'

    expect(await processMessageOutput(input)).toBeTruthy()
  })
})
