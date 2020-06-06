import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
// import UserToken from '../infra/typeorm/entities/UserToken';

interface IRequest {
    password: string;
    token: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserToken')
        private userToken: IUserTokensRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userToken.findByToken(token);

        if (!userToken) throw new AppError('User token does not exist');

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) throw new AppError('User does not exist');

        // Se a hora atual for depois da hora de criação do token + 2
        if (isAfter(Date.now(), addHours(userToken.created_at, 2)))
            throw new AppError('Expired Token');

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
