/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import { validString } from '../__fixtures__/message.js'
import { processMessageOutput } from '../__fixtures__/service.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('../src/message.js', () => ({ validString }))
jest.unstable_mockModule('../src/service.js', () => ({ processMessageOutput }))

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    // Set the action's inputs as return values from core.getInput().
    core.getInput.mockImplementation(() => 'hello!')
    validString.mockImplementation(() => true)
    processMessageOutput.mockImplementation(() =>
      Promise.resolve('This was the received message: hello!')
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Sets the message output', async () => {
    await run()

    // Verify the message output was set.
    expect(core.setOutput).toHaveBeenNthCalledWith(
      1,
      'message',
      // Simple regex to match a message string
      expect.stringMatching(/This was the received message: hello!/)
    )
  })

  it('Given an empty message input setFailed should be called once', async () => {
    core.getInput.mockClear().mockReturnValueOnce('')

    validString.mockClear().mockReturnValueOnce(false)
    await run()

    expect(core.setFailed).toHaveBeenNthCalledWith(1, 'Empty message')
  })

  it('Given an error when trying to process output must call setFailed once', async () => {
    core.getInput.mockClear().mockReturnValueOnce('some')

    processMessageOutput.mockClear().mockImplementationOnce(() => {
      return Promise.reject('Reject!')
    })
    await run()

    expect(core.setFailed).toHaveBeenNthCalledWith(1, 'Reject!')
  })

  it('Given an error instance when trying to process output must call setFailed once with error message', async () => {
    processMessageOutput.mockClear().mockImplementationOnce(() => {
      return Promise.reject(new Error('Error instance!'))
    })

    await run()

    expect(core.setFailed).toHaveBeenNthCalledWith(1, 'Error instance!')
  })

  it('Given an unknown error when trying to process output must call setFailed once with error message', async () => {
    processMessageOutput.mockClear().mockImplementationOnce(() => {
      return Promise.reject(2)
    })

    await run()

    expect(core.setFailed).toHaveBeenNthCalledWith(1, 'Unknown Error')
  })
})
