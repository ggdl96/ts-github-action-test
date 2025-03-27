import * as github from '@actions/github'
import * as core from '@actions/core'

import { RepoInfo } from './types.js'

export async function getIdToken(apiUrl: string) {
  if (!apiUrl) {
    throw new Error('apiUrl must be Provided')
  }
  let token = ''
  try {
    token = await core.getIDToken(apiUrl)
  } catch (error) {
    console.error('Error getting ID token', error)
    token = ''
  }

  return token
}

export function getRepoInfo(): RepoInfo {
  return github.context.repo
}
