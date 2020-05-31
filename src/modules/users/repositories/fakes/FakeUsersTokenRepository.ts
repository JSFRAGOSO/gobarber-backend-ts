import { uuid } from 'uuidv4';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUsersTokenRepository implements IUserTokenRepository {
    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            user_id,
            name: '',
            email: '',
            password: '',
            avatar: '',
        });

        this.userTokens.push(userToken);

        return userToken;
    }
}

export default FakeUsersTokenRepository;
