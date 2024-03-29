import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { router } from './shared/http/routes'
import { AppError } from './shared/errors/AppError'
import { ZodError } from 'zod'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { env } from './env'

const app = express()

const corsOptions = {
  origin:
    env.NODE_ENV === 'dev'
      ? 'http://localhost:5173'
      : 'https://finance-front-jet.vercel.app',
  credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
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

export { app }
