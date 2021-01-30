import handlebars from 'handlebars'

import IParseTemplateDTO from '../dtos/IParseTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandlebarsMailTemplateProvider implements IMailTemplateProvider {

  public async parse({ template, variables }: IParseTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)
  }

}
