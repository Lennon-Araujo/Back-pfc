import fs from 'node:fs'
import handlebars from 'handlebars'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { MailerProvider } from '../mailer-provider'
import { AppError } from '@/shared/errors/AppError'

dotenv.config()

export class NodeMailer implements MailerProvider {
  async sendForgotPasswordEmail(
    email: string,
    name: string,
    token: string,
    templatePath: string,
  ) {
    const mailerUser = process.env.MAILER_USER
    const mailerPass = process.env.MAILER_PASS
    const mailerHost = process.env.MAILER_HOST
    const mailerPort = process.env.MAILER_PORT

    const forgotPasswordURL = process.env.FRONT_CLIENT_FORGOT_PASSWORD_URL

    const link = `${forgotPasswordURL}${token}`
    const transport = nodemailer.createTransport({
      host: mailerHost,
      port: Number(mailerPort),
      secure: false,
      auth: {
        user: mailerUser,
        pass: mailerPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    const templateFileContent = fs.readFileSync(templatePath).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)

    const templateHTML = templateParse({ name, link })

    transport.sendMail(
      {
        to: email,
        subject: 'Recuperação de Senha - Finance',
        from: mailerUser,
        html: templateHTML,
      },
      (error, info) => {
        if (error) {
          throw new AppError(
            'Não foi possível enviar email de recuperação de senha.',
            400,
          )
        }
        return info
      },
    )
  }
}
