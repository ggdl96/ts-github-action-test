import * as github from '@actions/github'
import { RepoInfo } from './types.js'

export function getRepoInfo(): RepoInfo {
  return github.context.repo
}
