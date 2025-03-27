import { z } from 'zod'

export const StepSchema = z.object({
  name: z.string(),
  status: z.string()
})

export const StepListSchema = z.array(StepSchema)

export const ResponseSchema = z.object({
  message: z.string(),
  description: z.string(),
  steps: StepListSchema
})
