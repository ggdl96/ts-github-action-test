/**
 * Unit tests for src/schemas.ts
 */

import { ResponseSchema, StepSchema } from '../src/schemas'
describe('schemas.ts', () => {
  test('given an object to parse by StepSchema it must parse correctly', () => {
    const parsed = StepSchema.safeParse({
      name: 'step',
      status: 'completed'
    })

    expect(parsed.data).toStrictEqual({
      name: 'step',
      status: 'completed'
    })
  })

  test('given an object to parse by ResponseSchema it must parse correctly', () => {
    const parsed = ResponseSchema.safeParse({
      message: 'a message',
      description: 'description',
      steps: [
        {
          name: 'step',
          status: 'completed'
        }
      ]
    })

    expect(parsed.data).toStrictEqual({
      message: 'a message',
      description: 'description',
      steps: [
        {
          name: 'step',
          status: 'completed'
        }
      ]
    })
  })
})
