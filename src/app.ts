import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { router } from './shared/http/routes'
import { AppError } from './shared/errors/AppError'

const app = express()
app.use(express.json())
app.use(router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${err.message}`,
  })
})

// TODO adicionar handler de erros das validações do ZOD

export { app }
