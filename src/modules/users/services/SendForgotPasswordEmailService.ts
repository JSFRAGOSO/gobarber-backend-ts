import { inject, injectable } from 'tsyringe';
// import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
// import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
// import UserToken from '../infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
        @inject('UserToken')
        private userToken: IUserTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new AppError('User does not exist');

        const { token } = await this.userToken.generate(user.id);
        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[GoBarber] Recuperação de senha 🔐',
            templateData: {
                template: 'Olá {{name}}: {{token}}',
                variables: {
                    name: user.name,
                    token,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
