import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseTemplateMailDTO from '../dtos/IParseTemplateMailDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ template }: IParseTemplateMailDTO): Promise<string> {
        return template;
    }
}

export default FakeMailTemplateProvider;
