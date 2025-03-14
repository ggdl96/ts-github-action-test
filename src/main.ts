import * as core from '@actions/core'
import { validString } from './message.js'
import { processMessageOutput } from './service.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const message: string = core.getInput('message')

    if (!validString(message)) {
      const error = 'Empty message'
      core.error(error)
      core.setFailed(error)
    }
    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Message: ${message}`)

    const messageOutput = await processMessageOutput(message)

    // Set outputs for other workflow steps to use
    core.setOutput('message', messageOutput)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
