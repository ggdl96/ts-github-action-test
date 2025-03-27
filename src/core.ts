import * as core from '@actions/core'

export async function getIdToken(apiUrl: string) {
  if (!apiUrl) {
    throw new Error('apiUrl must be Provided')
  }
  return await core.getIDToken(apiUrl)
}
