import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUserService.execute({
            name: 'Jonas',
            password: '123456',
            email: 'jonasfragoso@rocketseat.com.br',
        });

        expect(user).toHaveProperty('id');
        expect(user.name).toBe('Jonas');
    });

    it('should not be able to create an user that already exists', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUserService.execute({
            name: 'Jonas',
            password: '123456',
            email: 'jonasfragoso@rocketseat.com.br',
        });

        await expect(
            createUserService.execute({
                name: 'Jonas',
                password: '123456',
                email: 'jonasfragoso@rocketseat.com.br',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
