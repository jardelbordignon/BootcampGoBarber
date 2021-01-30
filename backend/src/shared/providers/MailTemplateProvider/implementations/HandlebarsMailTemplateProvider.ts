import handlebars from 'handlebars'
import fs from 'fs'

import IParseTemplateDTO from '../dtos/IParseTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandlebarsMailTemplateProvider implements IMailTemplateProvider {

  public async parse({ file, variables }: IParseTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }

}
