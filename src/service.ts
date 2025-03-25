import * as core from '@actions/core'
import axios from 'axios'
// import fs from 'fs'
// import FormData from 'form-data'
// import { Tool } from './inputs'
// import { getGitHubContext, getRepositoryInfo } from './github'
// import { getToken } from './core.js'

export async function processMessageOutput(message: string) {
  const apiUrl = core.getInput('api-url')
  const token = '' //await getToken()

  const url = `${apiUrl}/api-product/submit`

  const data = { owner: 'admin' }

  core.info('Engage with API')
  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((data) => {
      console.log(`Sucesss`)
      core.info('API Engagement Success')
      core.info('======= process =======')
      // PROBABLY BETTER WITH ZOD
      if (Array.isArray(data.data?.steps)) {
        for (const step of data.data.steps) {
          core.info(`------ ${step.name} ------`)
          core.info(`[${step.status}]`)
          core.info(`------ ------`)
        }
      }
      return `This was the received message: ${message}`
    })
    .catch((error) => {
      core.setFailed('API Engagement Failed')
      console.error(`'Failed with error: `, error)
      throw new Error(`Failed`)
    })
}
