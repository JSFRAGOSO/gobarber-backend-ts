import IParseTemplateEmailDTO from '../../MailTemplateProvider/dtos/IParseTemplateMailDTO';

interface IMailContact {
    name: string;
    email: string;
}
export default interface ISentMailDTO {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseTemplateEmailDTO;
}
