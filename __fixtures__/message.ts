import { jest } from '@jest/globals'

export const validString =
  jest.fn<typeof import('../src/message.js').validString>()
