import * as github from '@actions/github'
import * as core from '@actions/core'

import { RepoInfo } from './types.js'

export async function getIdToken(apiUrl: string) {
  if (!apiUrl) {
    throw new Error('apiUrl must be Provided')
  }
  return await core.getIDToken(apiUrl)
}

export function getRepoInfo(): RepoInfo {
  return github.context.repo
}
