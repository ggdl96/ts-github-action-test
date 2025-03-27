/**
 * Unit tests for src/github.ts
 */

import { jest } from '@jest/globals'

import * as core from '../__fixtures__/core.js'

import github from '../__fixtures__/github.js'

jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('@actions/github', github)

const { getRepoInfo, getIdToken } = await import('../src/github.js')

describe('github.ts', () => {
  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  describe('getRepoInfo', () => {
    it('returns an object with a owner and a repo fields', () => {
      expect(getRepoInfo()).toStrictEqual({
        owner: 'onwer',
        repo: 'repo'
      })
    })
  })

  describe('getIDToken', () => {
    beforeAll(() => {
      core.getIDToken.mockImplementation(async () => 'asd3xf43')
    })

    afterEach(() => {
      jest.resetModules()
      jest.clearAllMocks()
    })

    it('returns a token based on a passed url', async () => {
      const token = await getIdToken('http://some-url.com')
      expect(token).toStrictEqual('asd3xf43')
    })

    it('given a empty url it must throw an error', async () => {
      core.getIDToken.mockClear()

      await expect(async () => {
        await getIdToken('')
      }).rejects.toThrow('apiUrl must be Provided')
    })
  })
})
