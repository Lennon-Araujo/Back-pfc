import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { MailerProvider } from '../mailer-provider'
import { AppError } from '@/shared/errors/AppError'

dotenv.config()

export class NodeMailer implements MailerProvider {
  async sendForgotPasswordEmail(email: string, name: string, token: string) {
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

    // const templateFileContent = fs.readFileSync(templatePath).toString('utf-8')
    // const templateParse = handlebars.compile(templateFileContent)

    // const templateHTML = templateParse({ name, link })

    transport.sendMail(
      {
        to: email,
        subject: 'Recuperação de Senha - Finance',
        from: mailerUser,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            .container {
              width: 800px;
              font-family: Arial, Helvetica, sans-serif;
              align-items: left;
              justify-content: left;
              font-size: 12px;
            }

            span {
              display: block;
              margin: 10px;
            }

            span.footer {
              font-size: 10px;
            }

            button {
              margin: 10px;
              padding: 8px;
              background-color: #ffaa00;
              color: #352356;
              border-radius: 4px;
            }

            a {
              text-decoration: none;
              color: #352356;
            }

          </style>
        </head>
        <body>
        <div class="container">
          <span>Oi, ${name}</span>

          <br>

          <span>
            Você solicitou a troca da senha de acesso ao Finance - Personal Control.
            <br>
            Para trocar é bem simples, basta clicar no botão abaixo e escolher sua nova senha de acesso!
          </span>
          <button type="button">
            <a href="${link}">Redefinir Senha</a>
          </button>

          <span>
            Se o botão acima não funcionar, copie o link abaixo e cole em seu navegador:
            <a href="">${link}</a>
          </span>

          <span class="footer">
            <strong>Atenção! Este acesso expira em 10 minutos.</strong><br>
              Caso você tenha visto esse e-mail e/ou tenha acessado após este prazo, solicite uma nova redefinição de senha.
          </span>

          <span class="footer">
            <strong>Muito obrigado, Equipe Finance</strong>
          </span>
        </div>
        </body>
        </html>
        `,
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
