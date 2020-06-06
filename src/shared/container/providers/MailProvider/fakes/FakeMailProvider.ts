import IMailProvider from '../models/IMailProvider';
import ISentMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
    private messages: ISentMailDTO[] = [];

    public async sendMail(message: ISentMailDTO): Promise<void> {
        this.messages.push(message);
    }
}
