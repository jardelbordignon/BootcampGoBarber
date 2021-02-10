import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'

import { DI_MAIL_TEMPLATE_PROVIDER } from '@/shared/providers/MailTemplateProvider'
import IMailTemplateProvider from '@/shared/providers/MailTemplateProvider/models/IMailTemplateProvider'
import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'

@injectable()
export default class EtherealMailProvider implements IMailProvider {

  private client: Transporter

  constructor(
    @inject(DI_MAIL_TEMPLATE_PROVIDER)
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        },
        tls: {
          rejectUnauthorized: false
        }
      })

      this.client = transporter
    })
  }


  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from:{
        name: from ? from.name : 'Equipe GoBarber',
        address: from ? from.email : 'equipe@gobarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }

}
