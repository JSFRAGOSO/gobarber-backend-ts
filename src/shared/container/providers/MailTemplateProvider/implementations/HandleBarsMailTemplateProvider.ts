import handlebars from 'handlebars';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseTemplateMailDTO from '../dtos/IParseTemplateMailDTO';

class HandleBarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        template,
        variables,
    }: IParseTemplateMailDTO): Promise<string> {
        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}

export default HandleBarsMailTemplateProvider;
