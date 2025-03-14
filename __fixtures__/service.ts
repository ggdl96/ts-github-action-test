import { jest } from '@jest/globals'

export const processMessageOutput =
  jest.fn<typeof import('../src/service.js').processMessageOutput>()
