import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'
import aws from 'aws-sdk'

import mailConfig from '@/config/mail'
import { DI_MAIL_TEMPLATE_PROVIDER } from '@/shared/providers/MailTemplateProvider'
import IMailTemplateProvider from '@/shared/providers/MailTemplateProvider/models/IMailTemplateProvider'
import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'

@injectable()
export default class SESMailProvider implements IMailProvider {

  private client: Transporter

  constructor(
    @inject(DI_MAIL_TEMPLATE_PROVIDER)
    private mailTemplateProvider: IMailTemplateProvider
  ) {

    this.client = nodemailer.createTransport({
      SES: new aws.SES({ apiVersion: '2010-12-01', region: 'us-east-1' })
    })

  }


  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from

    await this.client.sendMail({
      from:{
        name: from ? from.name : name,
        address: from ? from.email : email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })
  }

}
