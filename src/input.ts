import * as core from '@actions/core'

export function getApiUrl() {
  return core.getInput('api-url')
}
