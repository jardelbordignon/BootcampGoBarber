import IParseTemplateDTO from '../dtos/IParseTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {

  public async parse({ template }: IParseTemplateDTO): Promise<string> {
    return template
  }

}
