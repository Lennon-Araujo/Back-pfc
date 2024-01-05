import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { router } from './shared/http/routes'
import { AppError } from './shared/errors/AppError'
import { ZodError } from 'zod'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: 'Validation error.', issues: err.format() })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${err.message}`,
  })
})

// TODO adicionar handler de erros das validações do ZOD

export { app }
