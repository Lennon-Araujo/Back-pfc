export interface MailerProvider {
  sendForgotPasswordEmail(
    email: string,
    name: string,
    token: string,
    templatePath: string,
  ): Promise<void>
}
