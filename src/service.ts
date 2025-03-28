import * as core from '@actions/core'
import axios from 'axios'
import { ResponseSchema, StepListSchema } from './schemas.js'
import { getIdToken, getRepoInfo } from './github.js'
import { getApiUrl } from './input.js'

export async function processMessageOutput(message: string) {
  const apiUrl = getApiUrl()
  const token = await getIdToken(apiUrl)

  const url = `${apiUrl}/api-product/submit`

  const repoInfo = getRepoInfo()
  const data = { owner: repoInfo.owner, message }

  core.info('Engage with API')

  const setup = {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : undefined
  }
  return axios
    .post(url, data, setup)
    .then((response) => {
      const parsedResponse = ResponseSchema.safeParse(response.data)

      if (!parsedResponse.success) {
        core.setFailed('API Engagement Failed: Invalid API response schema')
        throw new Error(`Invalid API response: ${parsedResponse.error}`)
      }

      const validData = parsedResponse.data

      core.info('API Engagement Success')
      core.info('======= process =======')

      validData.steps.forEach((step) => {
        core.info(`------ ${step.name} ------`)
        core.info(`[${step.status}]`)
        core.info(`------ ------`)
      })

      return validData.message
    })
    .catch((error) => {
      core.setFailed('API Engagement Failed')
      if (error.response.data) {
        if (error.response.data.detail) {
          console.error(error.response.data.detail.description)
          core.setFailed(
            `Error description ${error.response.data.detail.description}`
          )
        }

        if (error.response.data.detail?.steps) {
          const stepList = StepListSchema.safeParse(
            error.response.data.detail.steps
          )

          if (!stepList.success) {
            throw new Error(`Invalid API response: ${stepList.error}`)
          }

          stepList.data.forEach((step) => {
            core.info(`------ ${step.name} ------`)
            core.info(`[${step.status}]`)
            core.info(`------ ------`)
          })
        }
      } else {
        console.error('Failed with error: ', error)
        throw new Error('Failed')
      }
    })
}
