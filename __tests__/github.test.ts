/**
 * Unit tests for src/github.ts
 */

import { jest } from '@jest/globals'

import github from '../__fixtures__/github.js'

jest.unstable_mockModule('@actions/github', github)

const { getRepoInfo } = await import('../src/github.js')

describe('github.ts', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('returns an object with a owner and a repo fields', () => {
    expect(getRepoInfo()).toStrictEqual({
      owner: 'onwer',
      repo: 'repo'
    })
  })
})
