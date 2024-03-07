export interface MailerProvider {
  sendForgotPasswordEmail(
    email: string,
    name: string,
    token: string,
  ): Promise<void>
}
