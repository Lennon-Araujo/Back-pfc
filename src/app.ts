import express, { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import 'express-async-errors'

const app = express()
app.use(express.json())

app.post('/category', async (req: Request, res: Response) => {
  const registerBodySchema = z.object({
    name: z.string(),
  })

  const { name } = registerBodySchema.parse(req.body)

  await prisma.category.create({
    data: {
      name,
    },
  })

  return res.status(201).send()
})

export { app }
