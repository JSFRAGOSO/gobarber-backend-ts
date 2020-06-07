import handlebars from 'handlebars';
import fs from 'fs';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseTemplateMailDTO from '../dtos/IParseTemplateMailDTO';

class HandleBarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: IParseTemplateMailDTO): Promise<string> {
        const templateFile = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(templateFile);

        return parseTemplate(variables);
    }
}

export default HandleBarsMailTemplateProvider;
