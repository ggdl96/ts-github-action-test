import { jest } from '@jest/globals'

const github = jest.fn(() => ({
  __esModule: true,
  context: {
    repo: {
      owner: 'onwer',
      repo: 'repo'
    },
    payload: {},
    eventName: '',
    sha: '',
    ref: '',
    workflow: '',
    action: '',
    actor: '',
    job: '',
    runNumber: 0,
    runId: 0,
    apiUrl: '',
    serverUrl: '',
    graphqlUrl: '',
    issue: {
      owner: '',
      repo: '',
      number: 0
    }
  }
}))

export default github
